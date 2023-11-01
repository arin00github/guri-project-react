import { useSecureGuardDetail } from "../../services/hooks/secureGuard.hook";
import Panel from "../common-atoms/Panel";
import { SubTitle } from "../common-atoms/SubTitle";

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

    return (
        <Panel direction="left">
            <SubTitle px={3} mt={4}>
                {data?.response.name}
            </SubTitle>
        </Panel>
    );
};

export default MonitorControlPanel;
