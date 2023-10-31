import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * @constant
 * HTTP 통신 timeout 1.5초
 */
export const HTTP_REQUEST_TIMEOUT = 15000;

/**
 * @constant
 * HTTP 요청 기본 옵션(POST)
 */
export const REQUEST_OPTIONS = {
    method: "POST",
    data: undefined,
    timeout: HTTP_REQUEST_TIMEOUT,
    headers: {},
};

/**
 * @description axios 인스턴스 생성, 타임아웃, 헤더 설정
 */
const apiInstance = axios.create({
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * @name executeRequest
 * @function
 * @description executeRequest 함수는 axios 인스턴스(apiInstance)를 사용하여 HTTP 요청을 보내는 함수
 * @param {string} path
 * @param {AxiosRequestConfig} config
 * @returns {Promise<AxiosResponse | null>}
 */
export const executeRequest = async (path: string, config?: AxiosRequestConfig): Promise<AxiosResponse | null> => {
    try {
        return await apiInstance(path, { ...config });
    } catch (err) {
        const anyResult = err as AxiosError;
        if (anyResult && anyResult.response) {
            return anyResult.response;
        }
    }
    return null;
};
