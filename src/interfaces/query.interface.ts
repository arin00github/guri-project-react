import { ErrorResponse } from "./common.interface";
import { ControlDeviceType, PostDeviceResponse } from "./control.interface";

export type successCallback = (
    data: PostDeviceResponse | undefined,
    variables: ControlDeviceType,
    context: unknown,
) => void;
export type errorCallback = (error: ErrorResponse, variables: ControlDeviceType, context: unknown) => void;

/**
 * @property {successCallback} param.onSuccess API 호출 성공 시 콜백
 * @property {errorCallback} param.onError API 호출 실패 시 콜백
 */
export interface useControlParams {
    onSuccess?: successCallback;
    onError?: errorCallback;
}
