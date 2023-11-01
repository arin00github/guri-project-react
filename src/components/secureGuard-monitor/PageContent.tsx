import { monitorSelectedId } from "../../services/recoil/monitorAtom";
import Map from "../map/Map";

import MonitorAssetPanel from "./MonitorAssetPanel";
import MonitorControlPanel from "./MonitorControlPanel";

import { Container } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

/**
 * @type {React.FC}
 * @name PageContent
 * @description SecureGuardMonitorPage의 PageContent 컴포넌트
 */
export const PageContent = () => {
    const selectedAsset = useRecoilValue(monitorSelectedId);

    return (
        <Container w="100%" h="calc(100vh - 50px)" pos="relative">
            <MonitorAssetPanel />
            {selectedAsset && <MonitorControlPanel selectedId={selectedAsset} />}
            <Map />
        </Container>
    );
};
