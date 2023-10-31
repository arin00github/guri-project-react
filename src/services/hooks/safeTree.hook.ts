import { ErrorResponse, FeatureAsset } from "../../interfaces/common.interface";
import { ControlDeviceType, PostDeviceResponse, SafeTreeDetailResponse } from "../../interfaces/control.interface";
import { getDeviceAssets, postDeviceControl } from "../api/common.api";
import { getSafeTreeControlDetail } from "../api/safeTree.api";

import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";

const SAFE_TREE_QUERY_KEY = {
    ASSET: "smart-safe-tree-assets",
    DETAIL: "smart-safe-tree-detail",
    CONTROL: "smart-safe-tree-control",
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

export const useSafeTreeControl = (): UseMutationResult<
    PostDeviceResponse | undefined,
    ErrorResponse,
    ControlDeviceType
> => {
    return useMutation({
        mutationKey: [SAFE_TREE_QUERY_KEY.CONTROL],
        mutationFn: (newControl: ControlDeviceType) => postDeviceControl("safe-tree", newControl),
    });
};
