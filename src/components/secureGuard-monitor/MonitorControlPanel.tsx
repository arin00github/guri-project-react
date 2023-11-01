import { useMemo } from "react";

import { ModifiedDeviceType } from "../../interfaces/common.interface";
import { ControlDeviceType, SecureGuardDetail } from "../../interfaces/control.interface";
import { useSecureGuardDetail } from "../../services/hooks/secureGuard.hook";
import { securityGuardDeviceArray } from "../../utils/constant";
import Panel from "../common-atoms/Panel";
import { SubTitle } from "../common-atoms/SubTitle";

import { Box, Flex } from "@chakra-ui/react";

interface MonitorControlPanelProps {
    selectedId?: string;
}

/**
 * @type {React.FC}
 * @name MonitorPanel
 * @description SecureGuardMonitorPage의 MonitorPanel 컴포넌트
 */
const MonitorControlPanel = (props: MonitorControlPanelProps) => {
    const { selectedId } = props;

    const { data } = useSecureGuardDetail(selectedId);

    const modifiedData = useMemo(() => {
        let totalArray: ModifiedDeviceType[] = [];
        if (data?.response) {
            securityGuardDeviceArray.forEach(item => {
                const itemType = item.dvcType as keyof SecureGuardDetail;
                const dataArray = data.response[itemType] as ControlDeviceType[];
                const makeArray = dataArray.map((dt, idx) => {
                    return {
                        dvcName: `${item.dvcName}${idx > 0 ? idx + 1 : ""}`,
                        dvcData: dt,
                        dvcType: item.dvcType,
                        dvcId: dt.dvcId as string,
                    };
                });
                totalArray = totalArray.concat(...makeArray);
            });
        } else {
            return totalArray;
        }

        return totalArray;
    }, [data]);

    return (
        <Panel direction="left">
            {data?.response && (
                <Box>
                    <SubTitle px={3} mt={4}>
                        {data?.response.name}
                    </SubTitle>
                    <Flex flexDir={"column"}>
                        {modifiedData.map((item, idx) => {
                            return <Box key={`${item.dvcId}-${idx}`}>{item.dvcName}</Box>;
                        })}
                    </Flex>
                </Box>
            )}
        </Panel>
    );
};

export default MonitorControlPanel;
