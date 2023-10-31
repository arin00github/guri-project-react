import { useEffect, useState } from "react";

import { errorSet } from "../../interfaces/common.interface";
import { ControlDeviceType, ControlType } from "../../interfaces/control.interface";
import { deviceProperty, timeDaySelectArray } from "../../utils/constant";
import { checkArrayOption, transformDateString, transformOpacity } from "../../utils/control";
import ControlFormItem from "../common-molecules/ControlFormItem";

import {
    Button,
    ButtonGroup,
    Divider,
    Flex,
    FormLabel,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";

interface ControlModalProps {
    isOpen: boolean;
    onClose: () => void;
    controlData?: ControlDeviceType;
    onSubmit: (item: ControlDeviceType) => void;
    dvcType?: string;
}

const ControlModal = (props: ControlModalProps) => {
    const { isOpen, onClose, onSubmit, dvcType, controlData } = props;

    const [controls, setControls] = useState<ControlType[] | null>(null);

    /** 제어모드 값 */
    let modeState: number = 0;
    if (dvcType === "dvcATDR") {
        modeState = 1;
    } else {
        modeState = controls?.find(set => set.key === "auto")?.value as number;
    }

    /**
     * @name initiateForm
     * @description 입력값을 초기화 하는
     * @param {ControlDeviceType} originData 윈래 장치데이터
     */
    const initiateForm = (originData: ControlDeviceType, modeValue?: number) => {
        const newArray: ControlType[] = [];
        Object.entries(originData).forEach(entry => {
            const findProperty = deviceProperty.find(property => property.enName === entry[0]);

            let newValue = entry[1];
            if (entry[0] === "auto" && modeValue) {
                newValue = modeValue === 1 ? 0 : 1;
            }

            if (findProperty) {
                if (findProperty.type === "input" && typeof entry[1] === "number") {
                    newValue = Math.floor(entry[1]);
                }

                const newObject: ControlType = {
                    label: findProperty.krName,
                    key: findProperty.enName,
                    type: findProperty.type || "",
                    value: findProperty.type === "calendar" ? transformDateString(entry[1] as string) : newValue,
                };

                newArray.push(newObject);
            }
        });

        setControls(newArray);
    };

    /**
     * @name handleChageModeAndInitiate
     * @description 제어모드 값이 변할 때 실행되는 함수. 제어모드 값이 변하고 그 외에 모든 장치설정 값이 원래대로 초기화 된다.
     * @param {number} autoValue 제어모드 값
     */
    const handleChageModeAndInitiate = (autoValue: number) => {
        if (controlData) {
            initiateForm(controlData, autoValue);
        }
    };

    /**
     * @name checkValidateForm
     * @returns {boolean} 유효성검사 통과 여부
     */
    const checkValidateForm = () => {
        const newErrors: errorSet[] = [];
        let newSettingArray: ControlType[] | null = controls;
        controls?.forEach(st => {
            if (!newSettingArray) return;
            if (!st.value && typeof st.value !== "number") {
                newErrors.push({ key: st.key, message: "해당 장치의 값을 입력해 주세요" });
                newSettingArray = newSettingArray.map(std => {
                    return {
                        ...std,
                        errorMsg: std.key === st.key ? "해당 장치의 값을 입력해 주세요" : undefined,
                    };
                });
            }
            if (st.type === "input") {
                if (st.key === "autoTemp") {
                    const checkValue = Number(st.value) >= 18 && Number(st.value) <= 30;
                    if (!checkValue) {
                        newErrors.push({ key: st.key, message: "설정온도는 18~30 사이만 가능합니다" });
                        newSettingArray = newSettingArray.map(std => {
                            return {
                                ...std,
                                errorMsg: std.key === st.key ? "설정온도는 18~30 사이만 가능합니다" : undefined,
                            };
                        });
                    }
                } else if (st.key === "indrTemp") {
                    const checkValue = Number(st.value) >= -99 && Number(st.value) <= 99;
                    if (!checkValue) {
                        newErrors.push({ key: st.key, message: "실내온도는 -99~99 사이만 가능합니다" });
                        newSettingArray = newSettingArray.map(std => {
                            return {
                                ...std,
                                errorMsg: std.key === st.key ? "실내온도는 -99~99 사이만 가능합니다" : undefined,
                            };
                        });
                    }
                } else if (st.key === "colr") {
                    const hexColorRegex = /^[0-9A-Fa-f]{6}$/;
                    const checkValue = hexColorRegex.test(st.value as string);
                    if (!checkValue) {
                        newErrors.push({ key: st.key, message: "색상값 설정은 000000 ~ FFFFFF 사이만 가능합니다" });
                        newSettingArray = newSettingArray.map(std => {
                            return {
                                ...std,
                                errorMsg:
                                    std.key === st.key ? "색상값 설정은 000000 ~ FFFFFF 사이만 가능합니다" : undefined,
                            };
                        });
                    }
                }
            }
        });
        setControls(newSettingArray);
        if (newErrors.length > 0) {
            return false;
        } else {
            return true;
        }
    };

    /**
     * @name handleSubmit
     * @description '적용'버튼 클릭 시 실행되는 함수. settings 변수에 담긴 배열이 객체로 압축되어 상위컴포넌트 함수의 인자 값으로 들어간다.
     */
    const handleSubmit = async () => {
        if (controls) {
            if (checkValidateForm()) {
                const compressedObejct = controls.reduce((obj: Record<string, string | number>, item) => {
                    if (item.type === "calendar") {
                        obj[item.key] = `${String(item.value).split("-")[1]}${String(item.value).split("-")[2]}`;
                    } else if (item.type === "input") {
                        obj[item.key] = item.value as string | number;
                    } else {
                        obj[item.key] = item.value as string | number;
                    }

                    return obj;
                }, {});
                const applyItem = { ...compressedObejct, device_id: controlData ? controlData.dvcId : "" };
                //console.log("applyItem", applyItem);
                onSubmit(applyItem);
            }
        }
    };

    /**
     * @name handleChangeValue
     * @param {React.ChangeEvent<HTMLSelectElement | HTMLInputElement>} e 이벤트객체
     * @param {string} keyString key 문자열
     * @param {number | undefined} exValue 이전 값
     * @param {string | undefined} type 컴포넌트 타입
     * @description input, selet의 값이 변할 때 실행되는 함수
     */
    const handleChangeValue = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        keyString: string,
        exValue?: number,
        type?: string,
    ) => {
        if (controls) {
            let newValue: string | number = "";
            if (type === "input") {
                newValue = keyString !== "colr" ? Number(e.target.value) : e.target.value;
            } else if (type === "switch") {
                newValue = exValue === 1 ? 0 : 1;
            } else {
                newValue = e.target.value;
            }

            const newSettingArray = controls.map(settt => {
                return keyString === settt.key
                    ? {
                          ...settt,
                          value: newValue,
                          errorMsg: undefined,
                      }
                    : settt;
            });
            setControls(newSettingArray);
        }
    };

    useEffect(() => {
        /** 모달창이 열릴 때마다 설정 값이 초기화 */
        if (controlData && isOpen) {
            initiateForm(controlData);
        }
    }, [controlData, isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent data-testid="control-modal-content">
                <ModalHeader>상세 설정 {modeState === 1 ? "(자동)" : "(수동)"}</ModalHeader>
                <ModalBody>
                    <Flex flexWrap="wrap">
                        {controls?.map((control, index) => {
                            return (
                                <Flex
                                    key={`${control.key}_${index}`}
                                    alignItems={"center"}
                                    flexBasis={
                                        checkArrayOption(timeDaySelectArray, control.key)
                                            ? "calc(50% - 12px)"
                                            : "calc(100% - 12px)"
                                    }
                                    w={
                                        checkArrayOption(timeDaySelectArray, control.key)
                                            ? "calc(50% - 12px)"
                                            : "calc(100% - 12px)"
                                    }
                                    marginRight={3}
                                    //flexDir={"column"}
                                    opacity={
                                        ["auto", "autoTemp"].includes(control.key)
                                            ? 1
                                            : transformOpacity(control.key, modeState)
                                    }
                                >
                                    <Flex w="100%" flexDir={"column"}>
                                        <Flex w="100%" py={2}>
                                            <FormLabel
                                                flex="none"
                                                w="100px"
                                                pb={0}
                                                h="32px"
                                                lineHeight="32px"
                                                fontSize="13px"
                                                mb={0}
                                            >
                                                {control.label}
                                            </FormLabel>
                                            <ControlFormItem
                                                control={control}
                                                dvcType={dvcType}
                                                modeState={modeState}
                                                handleChageModeAndInitiate={handleChageModeAndInitiate}
                                                handleChangeValue={handleChangeValue}
                                            />
                                        </Flex>
                                        {control.errorMsg && (
                                            <Text fontSize={"13px"} color="red.300" pl="112px" mb={2}>
                                                ※ {control.errorMsg}
                                            </Text>
                                        )}
                                        {control.key === "auto" && <Divider opacity={1} bg="whiteAlpha.400" />}
                                    </Flex>
                                </Flex>
                            );
                        })}
                    </Flex>
                </ModalBody>
                <ModalFooter py={10}>
                    <ButtonGroup>
                        <Button variant="outline" size="md" onClick={onClose} data-testid="control-modal-btn-cancel">
                            취소
                        </Button>
                        <Button
                            colorScheme="blue"
                            size="md"
                            onClick={handleSubmit}
                            data-testid="control-modal-btn-submit"
                        >
                            적용
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ControlModal;
