import { useMemo, useState } from "react";

import { ModifiedDeviceType, processStateType } from "../../interfaces/common.interface";
import { ControlDeviceType, SecureGuardDetail } from "../../interfaces/control.interface";
import { useSecureGuardControl, useSecureGuardDetail } from "../../services/hooks/secureGuard.hook";
import ErrorBox from "../common-atoms/ErrorBox";
import Loading from "../common-atoms/Loading";
import { SubTitle } from "../common-atoms/SubTitle";
import { ConfirmModal } from "../common-molecules/ConfirmModal";
import { ResultModal } from "../common-molecules/ResultModal";
import ControlCard from "../common-organisms/ControlCard";
import ControlModal from "../common-organisms/ControlModal";

import { Box, Flex, Grid, Text, useDisclosure } from "@chakra-ui/react";

interface ControlContainterProps {
    selectedId?: string;
}

const constDeviceArray: { dvcName: string; dvcType: string }[] = [
    { dvcName: "LED조명 정보", dvcType: "dvcLDLT" },
    { dvcName: "냉난방기", dvcType: "dvcARCO" },
    { dvcName: "자동문", dvcType: "dvcATDR" },
    { dvcName: "충전기", dvcType: "dvcCHGR" },
    { dvcName: "온열벤치", dvcType: "dvcHTBC" },
    { dvcName: "태양광패널", dvcType: "dvcSPGN" },
];

const ControlContainter = (props: ControlContainterProps) => {
    const { selectedId } = props;

    /** @returns {string | undefined} 장비상세 클릭 시 선택된 장비의 아이디 저장 */
    const [selectedDevice, setSelectedDevice] = useState<string>();

    /** @returns {ControlDeviceType | undefined} 설정이 변경된 장치설정 정보를 임시 저장 */
    const [savedControl, setSavedControl] = useState<ControlDeviceType>();

    /** @returns {processStateType} 서비스 진행 시 필요한 요소 임시 저장하는 변수 (action: 서비스기능 구분, message: 모달창에 나타나느 메시지) */
    const [processState, setProcessState] = useState<processStateType>({ message: "", action: "" });

    /** @description 장치의 상세설정 모달창 관리하는 훅 */
    const { isOpen: isControlOpen, onOpen: onControlOpen, onClose: onControlClose } = useDisclosure();

    /** @description 확인 모달창 관리하는 훅 */
    const { isOpen: isConfirmOpen, onClose: onConfirmClose, onOpen: onConfirmOpen } = useDisclosure();

    /** @description 결과 모달창 관리하는 훅 */
    const { isOpen: isResultOpen, onClose: onResultClose } = useDisclosure();

    /**
     * @description 선택된자산의 장치상세정보를 불러오는 API, 이를 관리하는 react-query로 만든 훅
     */
    const { data, isLoading, isError } = useSecureGuardDetail(selectedId);

    const controlMutation = useSecureGuardControl();

    const modifiedData = useMemo(() => {
        const totalArray: ModifiedDeviceType[] = [];
        if (data?.response) {
            constDeviceArray.forEach(item => {
                const itemType = item.dvcType as keyof SecureGuardDetail;
                const dataArray = data.response[itemType] as ControlDeviceType[];
                const makeArray = dataArray.map((dt, idx) => {
                    return {
                        dvcName: `${item.dvcName}${idx > 0 ? idx + 1 : ""}`,
                        dvcData: dt,
                        dvcType: item.dvcType,
                    };
                });
                totalArray.concat(...makeArray);
            });
        } else {
            return totalArray;
        }

        return totalArray;
    }, [data]);

    /**
     * @name onCloseResultModal
     * @description ResultModal을 close 되게 만드는 함수
     */
    const onCloseResultModal = () => {
        onResultClose();
        onControlClose();
    };

    /**
     * @name onClickIconBtn
     * @description 아이콘 버튼 클릭 시 상세설정 모달 창이 나타는 함수
     */
    const onClickIconBtn = (deviceTypeId: string) => {
        setSelectedDevice(deviceTypeId);
        onControlOpen();
    };

    /**
     * @name onSubmitInControlModal
     * @description 상세설정 모달창에서 적용 버튼 클릭 시 실행되는 함수
     */
    const onSubmitControlModal = (item: ControlDeviceType) => {
        setSavedControl(item);
        setProcessState({
            ...processState,
            message: `상세 설정 변경을 하시겠습니까?`,
            action: "control-change",
        });
        onConfirmOpen();
    };

    /**
     * @name onClickConfirmModal
     * @description ConfirmModal에서 yes속성의 버튼 클릭 시 실행되는 함수
     */
    const onClickConfirmModal = async () => {
        onConfirmClose();
        if (processState.action === "control-change") {
            if (savedControl) {
                controlMutation.mutate(savedControl);
            }
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorBox />;
    }

    return (
        <Box pos="relative">
            <Flex pb={7} alignItems="center">
                <SubTitle pb={0} data-testid="sg-subtitle-2" display="flex" alignItems="flex-end">
                    <Text pr={2} fontSize="28px" color="blue.200" data-testid="detail-header-name">
                        description
                    </Text>
                    <Text>장치 상태 및 상세설정</Text>
                </SubTitle>
            </Flex>
            <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                {modifiedData?.length > 0 &&
                    modifiedData?.map((device, idx) => {
                        return (
                            <ControlCard
                                key={`${device.dvcType}_${idx}`}
                                title={device.dvcName}
                                controlData={device.dvcData}
                                dvcType={device.dvcType}
                                onClickIconBtn={() => onClickIconBtn(device.dvcType)}
                            />
                        );
                    })}
            </Grid>
            {data && selectedDevice && (
                <ControlModal
                    isOpen={isControlOpen}
                    onClose={onControlClose}
                    onSubmit={onSubmitControlModal}
                    controlData={modifiedData.find(item => item.dvcType === selectedDevice)?.dvcData}
                    dvcType={selectedDevice}
                />
            )}
            <ConfirmModal
                isOpen={isConfirmOpen}
                message={processState.message}
                onYesClick={onClickConfirmModal}
                onClose={onConfirmClose}
            />
            <ResultModal
                isOpen={isResultOpen}
                onClose={onCloseResultModal}
                onYesClick={onCloseResultModal}
                message={processState.message}
            />
        </Box>
    );
};

export default ControlContainter;
