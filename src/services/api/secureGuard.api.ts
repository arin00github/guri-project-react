import { ErrorResponse } from "../../interfaces/common.interface";
import { SecureGuardDetailResponse } from "../../interfaces/control.interface";
import { SECURE_GUARD_API_URL } from "../../utils/constant";
import { configureUrl } from "../../utils/utils";

import { REQUEST_OPTIONS, executeRequest } from "./httpService";

/**
 * @name getSecureGuardControlDetail
 * @description 선택한 장치의 상세정보를 가져오는 API
 * @param {string | undefined} selectedId 선택한 장치아이디
 * @returns {Promise<SecureGuardDetailResponse | ErrorResponse | undefined>} 선택한 장치의 상세정보
 */
export const getSecureGuardControlDetail = async (
    selectedId?: string,
): Promise<SecureGuardDetailResponse | ErrorResponse | undefined> => {
    const currentUrl = configureUrl({
        testUrl: SECURE_GUARD_API_URL.DetailInfo_Test,
        url: SECURE_GUARD_API_URL.DetailInfo,
    });

    const resObject = await executeRequest(currentUrl, {
        ...REQUEST_OPTIONS,
        data: { uid: selectedId },
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
