import { ErrorResponse, FeatureAsset } from "../../interfaces/common.interface";
import { ControlDeviceType, PostDeviceResponse, SafeTreeDetailResponse } from "../../interfaces/control.interface";
import { useControlParams } from "../../interfaces/query.interface";
import { getDeviceAssets, postDeviceControl } from "../api/common.api";
import { getSafeTreeControlDetail } from "../api/safeTree.api";
import { safetreeSelectedId } from "../recoil/controlAtom";

import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

/**
 * @constant SAFE_TREE_QUERY_KEY
 * @description 안심트리 장치설정 API Query Key
 */
const SAFE_TREE_QUERY_KEY = {
    ASSET: "smart-safe-tree-assets",
    DETAIL: "smart-safe-tree-detail",
    CONTROL: "smart-safe-tree-control",
};

/**
 * @name useSafeTreeAssets
 * @description 안심트리 장치설정 자산목록 API Hook
 * @returns useQueryResult
 */
export const useSafeTreeAssets = (): UseQueryResult<FeatureAsset[] | undefined, ErrorResponse> => {
    /** 선택한 자산의 아이디 */
    const [selectedId, setSelectedId] = useRecoilState(safetreeSelectedId);
    return useQuery({
        queryKey: [SAFE_TREE_QUERY_KEY.ASSET],
        queryFn: () => getDeviceAssets("safe-tree"),
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
 * @name useSafeTreeDetail
 * @description 안심트리 장치설정 상세 API Hook
 * @param {string | undefined} selectedId 선택한 자산의 아이디
 * @returns useQueryResult
 */
export const useSafeTreeDetail = (selectedId?: string): UseQueryResult<SafeTreeDetailResponse, ErrorResponse> => {
    return useQuery({
        queryKey: [SAFE_TREE_QUERY_KEY.DETAIL, selectedId],
        queryFn: () => getSafeTreeControlDetail(selectedId),
    });
};

/**
 * @name useSafeTreeControl
 * @description 안심트리 장치설정 변경 API Hook
 * @param {successCallback} param.onSuccess API 호출 성공 시 콜백
 * @param {errorCallback} param.onError API 호출 실패 시 콜백
 * @returns useMutationResult
 */
export const useSafeTreeControl = ({
    onError,
    onSuccess,
}: useControlParams): UseMutationResult<PostDeviceResponse | undefined, ErrorResponse, ControlDeviceType> => {
    return useMutation({
        mutationKey: [SAFE_TREE_QUERY_KEY.CONTROL],
        mutationFn: (newControl: ControlDeviceType) => postDeviceControl("safe-tree", newControl),
        onError,
        onSuccess,
    });
};
