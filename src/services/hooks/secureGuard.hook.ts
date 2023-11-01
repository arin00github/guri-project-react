import { ErrorResponse, FeatureAsset } from "../../interfaces/common.interface";
import { ControlDeviceType, PostDeviceResponse, SecureGuardDetailResponse } from "../../interfaces/control.interface";
import { useControlParams } from "../../interfaces/query.interface";
import { getDeviceAssets, postDeviceControl } from "../api/common.api";
import { getSecureGuardControlDetail } from "../api/secureGuard.api";
import { secureGuardSelectedId } from "../recoil/controlAtom";

import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

/**
 * @constant SECURE_GUARD_QUERY_KEY
 * @description 방범초소 장치설정 API Query Key
 */
const SECURE_GUARD_QUERY_KEY = {
    ASSET: "smart-secure-guard-assets",
    DETAIL: "smart-secure-guard-detail",
    CONTROL: "smart-secure-guard-control",
};

/**
 * @name useSecureGuardAssets
 * @description 방범초소 장치설정 자산목록 API Hook
 * @returns useQueryResult
 */
export const useSecureGuardAssets = (): UseQueryResult<FeatureAsset[] | undefined, ErrorResponse> => {
    /** 선택한 자산의 아이디 */
    const [selectedId, setSelectedId] = useRecoilState(secureGuardSelectedId);

    return useQuery({
        queryKey: [SECURE_GUARD_QUERY_KEY.ASSET],
        queryFn: () => getDeviceAssets("secure-guard"),
        select: response => {
            if (!selectedId) {
                const assetId = response?.[0].properties.id as string;
                setSelectedId(assetId.split(".")[1]);
            }
            return response;
        },
    });
};

/**
 * @name useSecureGuardDetail
 * @description 방범초소 장치설정 상세 API Hook
 * @param selectedId 선택한 자산의 아이디
 * @returns useQueryResult
 */
export const useSecureGuardDetail = (selectedId?: string): UseQueryResult<SecureGuardDetailResponse, ErrorResponse> => {
    return useQuery({
        queryKey: [SECURE_GUARD_QUERY_KEY.DETAIL, selectedId],
        queryFn: () => getSecureGuardControlDetail(selectedId),
    });
};

/**
 * @name useSecureGuardControl
 * @description 방범초소 장치설정 변경 API Hook
 * @param {successCallback} param.onSuccess API 호출 성공 시 콜백
 * @param {errorCallback} param.onError API 호출 실패 시 콜백
 * @returns useQueryResult
 */
export const useSecureGuardControl = ({
    onSuccess,
    onError,
}: useControlParams): UseMutationResult<PostDeviceResponse | undefined, ErrorResponse, ControlDeviceType> => {
    return useMutation({
        mutationKey: [SECURE_GUARD_QUERY_KEY.CONTROL],
        mutationFn: (newControl: ControlDeviceType) => postDeviceControl("secure-guard", newControl),
        onSuccess,
        onError,
    });
};
