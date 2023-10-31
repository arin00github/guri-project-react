import { ErrorResponse, FeatureAsset } from "../../interfaces/common.interface";
import { SafeTreeDetailResponse } from "../../interfaces/control.interface";
import { getDeviceAssets } from "../api/common.api";
import { getSafeTreeControlDetail } from "../api/safeTree.api";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

const SAFE_TREE_QUERY_KEY = {
    ASSET: "smart-safe-tree-assets",
    DETAIL: "smart-safe-tree-detail",
};

export const useSafeTreeAssets = (): UseQueryResult<FeatureAsset[], ErrorResponse> => {
    return useQuery({
        queryKey: [SAFE_TREE_QUERY_KEY.ASSET],
        queryFn: () => getDeviceAssets("safe-tree"),
    });
};

export const useSafeTreeDetail = (selectedId?: string): UseQueryResult<SafeTreeDetailResponse, ErrorResponse> => {
    return useQuery({
        queryKey: [SAFE_TREE_QUERY_KEY.DETAIL, selectedId],
        queryFn: () => getSafeTreeControlDetail(selectedId),
    });
};
