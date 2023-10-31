import { ErrorResponse, FeatureAsset } from "../../interfaces/common.interface";
import { ControlDeviceType, PostDeviceResponse } from "../../interfaces/control.interface";
import { ASSET_API_URL, SAFE_TREE_API_URL, SECURE_GUARD_API_URL } from "../../utils/constant";
import { configureUrl } from "../../utils/utils";

import { REQUEST_OPTIONS, executeRequest } from "./httpService";

/**
 * @name getDeviceAssets
 * @description 장치의 자신 목록을 가져오는 API
 * @param {string} layerId 장치의 레이어 아이디
 * @returns {Promise<FeatureAsset[] | undefined>}
 */
export const getDeviceAssets = async (layerId: string): Promise<FeatureAsset[] | undefined> => {
    const currentUrl = configureUrl({
        testUrl: ASSET_API_URL.AssetInfo_Test,
        url: ASSET_API_URL.AssetInfo,
    });

    const resObject = await executeRequest(currentUrl, {
        ...REQUEST_OPTIONS,
        data: { layerId },
    });
    if (resObject) {
        switch (resObject.status) {
            case 200:
                return resObject.data[0].features as FeatureAsset[];
            case 401:
                window.location.reload();
                break;
            default:
                return resObject.data;
        }
    } else {
        throw new Error("API 통신에 실패하였습니다.");
    }
};

/**
 * @name PostDeviceControl
 * @description 장치의 상세설정을 변경하는 API
 * @param {string} pageId
 * @param {ControlDeviceType} newControl
 * @returns {Promise<PostDeviceResponse | ErrorResponse | undefined>}
 */
export const PostDeviceControl = async (
    pageId: string,
    newControl: ControlDeviceType,
): Promise<PostDeviceResponse | ErrorResponse | undefined> => {
    const currentUrl = configureUrl({
        testUrl:
            pageId === "safe-tree" ? SAFE_TREE_API_URL.ControlChange_Test : SECURE_GUARD_API_URL.ControlChange_Test,
        url: pageId === "safe-tree" ? SAFE_TREE_API_URL.ControlChange : SECURE_GUARD_API_URL.ControlChange,
    });

    const resObject = await executeRequest(currentUrl, {
        ...REQUEST_OPTIONS,
        data: { control: newControl },
    });

    if (resObject) {
        switch (resObject.status) {
            case 200:
                return resObject.data as PostDeviceResponse;
            case 401:
                window.location.reload();
                break;
            default:
                return resObject.data;
        }
    } else {
        throw new Error("API 통신에 실패하였습니다.");
    }
};
