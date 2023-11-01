import { ControlDeviceType } from "../../interfaces/control.interface";
import { calculateColSpan, combineProperties, searchDataByProPerty } from "../../utils/control";
import DataStats from "../common-molecules/DataStat";

import { Box, Flex, GridItem, Heading, IconButton, StatGroup } from "@chakra-ui/react";

interface ControlCardProps {
    title: string;
    dvcType: string;
    controlData: ControlDeviceType;
    onClickIconBtn: () => void;
}

/**
 * @name ControlCard
 * @description 각 장치의 정보가 표시되는 카드 박스 컴포넌트
 * @param {ControlCardProps} props
 * @returns
 */
const ControlCard = (props: ControlCardProps) => {
    const { title, dvcType, controlData, onClickIconBtn } = props;

    /**
     * @name renderStats
     * @description 장치 상세정보에서 표시할 데이터를 불러오는 함수
     * @param {ControlDeviceType} controlData 장지상세 데이터 정보
     * @param {string | undefined} dvcType 장치 타입
     * @returns
     */
    const renderStats = (controlData: ControlDeviceType, dvcType?: string) => {
        const properties = combineProperties(controlData);
        return (
            <>
                {Object.entries(properties).map(([key, value], idx) => {
                    let statLabel: string = searchDataByProPerty(key, "krName") || "";
                    if (dvcType === "dvcATDR" && key === "oprtMode") {
                        statLabel = "작동상태";
                    }

                    return (
                        <DataStats
                            key={idx}
                            statLabel={statLabel}
                            keyString={key}
                            valueString={`${value}`}
                            dvcType={dvcType}
                        />
                    );
                })}
            </>
        );
    };

    const dvcId = (controlData.dvcId as string) || "";

    /** @returns {boolean} 장치정보에서 아이디에 SPGN가 포함되어 있으면 false 값 도출 */
    const notPopupBtn = dvcId.includes("SPGN");

    return (
        <GridItem
            key={`${dvcType}-${title}`}
            pb={7}
            pos="relative"
            colSpan={controlData && calculateColSpan(controlData)}
        >
            <Box border="1px solid" borderColor="innodep.500" boxShadow="4px 4px 5px 5px rgba(0,0,0,0.2)">
                <Heading fontSize={18} p={3} bg="innodep.600" pos="relative">
                    {title}
                    {!notPopupBtn && (
                        <IconButton
                            onClick={onClickIconBtn}
                            pos="absolute"
                            top={1.5}
                            right={2}
                            aria-label="device-control-setting"
                            data-testid={`device-control-setting-btn-${dvcType}`}
                            // icon={<HamburgerIcon />}
                        />
                    )}
                </Heading>
                <Flex w="100%" px={6} py={8}>
                    <StatGroup w="100%">{controlData && renderStats(controlData, dvcType)}</StatGroup>
                </Flex>
            </Box>
        </GridItem>
    );
};

export default ControlCard;
