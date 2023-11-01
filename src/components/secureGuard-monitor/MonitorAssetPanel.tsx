import { useMemo } from "react";

import { AssetItem } from "../../interfaces/monitor.interface";
import { useSecureGuardAssets } from "../../services/hooks/secureGuard.hook";
import { monitorSelectedId } from "../../services/recoil/monitorAtom";
import Panel from "../common-atoms/Panel";
import { SubTitle } from "../common-atoms/SubTitle";
import MonitorList from "../common-organisms/MonitorList";

import { useSetRecoilState } from "recoil";

/**
 * @type {React.FC}
 * @name MonitorPanel
 * @description SecureGuardMonitorPage의 MonitorPanel 컴포넌트
 */
const MonitorAssetPanel = () => {
    //const navigate = useNavigate();

    const { data } = useSecureGuardAssets();

    const setSelectAsset = useSetRecoilState(monitorSelectedId);

    const assetList: AssetItem[] = useMemo(() => {
        if (data) {
            return data.map(dt => {
                return {
                    show_label: dt.properties.show_label as string,
                    id: dt.properties.id as string,
                    asset_id: dt.properties.asset_id as string,
                    name: dt.properties.name as string,
                };
            });
        } else {
            return [];
        }
    }, [data]);

    return (
        <Panel direction="right">
            <SubTitle px={3} mt={4}>
                자산 리스트
            </SubTitle>
            {data && (
                <MonitorList
                    assetList={assetList}
                    handleClickListBox={asset => {
                        const assetId = asset.id.split(".")[1];
                        setSelectAsset(assetId);
                        //navigate(`/${SECURE_GUARD}/${CONTROL}`);
                    }}
                />
            )}
        </Panel>
    );
};

export default MonitorAssetPanel;
