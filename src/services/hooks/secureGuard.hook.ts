import { ErrorResponse, FeatureAsset } from "../../interfaces/common.interface";
import { SafeTreeDetailResponse } from "../../interfaces/control.interface";
import { getDeviceAssets } from "../api/common.api";
import { getSafeTreeControlDetail } from "../api/safeTree.api";

import { UseQueryResult, useQuery } from "@tanstack/react-query";

const SECURE_GUARD_QUERY_KEY = {
    ASSET: "smart-secure-guard-assets",
    DETAIL: "smart-secure-guard-detail",
};

export const useSecureGuardAssets = (): UseQueryResult<FeatureAsset[], ErrorResponse> => {
    return useQuery({
        queryKey: [SECURE_GUARD_QUERY_KEY.ASSET],
        queryFn: () => getDeviceAssets("secure-guard"),
    });
};

export const useSecureGuardDetail = (selectedId?: string): UseQueryResult<SafeTreeDetailResponse, ErrorResponse> => {
    return useQuery({
        queryKey: [SECURE_GUARD_QUERY_KEY.DETAIL, selectedId],
        queryFn: () => getSafeTreeControlDetail(selectedId),
    });
};
