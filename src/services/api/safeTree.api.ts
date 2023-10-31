import { ErrorResponse } from "../../interfaces/common.interface";
import { SafeTreeDetailResponse } from "../../interfaces/control.interface";
import { SAFE_TREE_API_URL } from "../../utils/constant";
import { configureUrl } from "../../utils/utils";

import { REQUEST_OPTIONS, executeRequest } from "./httpService";

/**
 * @name getSafeTreeControlDetail
 * @description 선택한 장치의 상세정보를 가져오는 API
 * @param {string | undefined} selectedId 선택한 장치아이디
 * @returns {Promise<SafeTreeDetailResponse | ErrorResponse | undefined>} 선택한 장치의 상세정보
 */
export const getSafeTreeControlDetail = async (
    selectedId?: string,
): Promise<SafeTreeDetailResponse | ErrorResponse | undefined> => {
    const currentUrl = configureUrl({
        testUrl: SAFE_TREE_API_URL.DetailInfo_Test,
        url: SAFE_TREE_API_URL.DetailInfo,
    });

    const resObject = await executeRequest(currentUrl, {
        ...REQUEST_OPTIONS,
        data: { id: selectedId },
    });

    if (resObject) {
        switch (resObject.status) {
            case 200:
                return resObject.data;
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
