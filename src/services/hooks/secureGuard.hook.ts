import { ErrorResponse, FeatureAsset } from "../../interfaces/common.interface";
import { ControlDeviceType, PostDeviceResponse, SecureGuardDetailResponse } from "../../interfaces/control.interface";
import { getDeviceAssets, postDeviceControl } from "../api/common.api";
import { getSafeTreeControlDetail } from "../api/safeTree.api";

import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";

const SECURE_GUARD_QUERY_KEY = {
    ASSET: "smart-secure-guard-assets",
    DETAIL: "smart-secure-guard-detail",
    CONTROL: "smart-secure-guard-control",
};

export const useSecureGuardAssets = (): UseQueryResult<FeatureAsset[], ErrorResponse> => {
    return useQuery({
        queryKey: [SECURE_GUARD_QUERY_KEY.ASSET],
        queryFn: () => getDeviceAssets("secure-guard"),
    });
};

export const useSecureGuardDetail = (selectedId?: string): UseQueryResult<SecureGuardDetailResponse, ErrorResponse> => {
    return useQuery({
        queryKey: [SECURE_GUARD_QUERY_KEY.DETAIL, selectedId],
        queryFn: () => getSafeTreeControlDetail(selectedId),
    });
};

export const useSecureGuardControl = (): UseMutationResult<
    PostDeviceResponse | undefined,
    ErrorResponse,
    ControlDeviceType
> => {
    return useMutation({
        mutationKey: [SECURE_GUARD_QUERY_KEY.CONTROL],
        mutationFn: (newControl: ControlDeviceType) => postDeviceControl("secure-guard", newControl),
    });
};
