import { CommonResponse } from "./common.interface";

export interface ModeState {
    auto_ctrl_yn: boolean;
}

export interface CctvInfoType {
    name: string;
    cctv_id: string;
}

/**
 * @description 장치의 상세정보 단위
 */
export type ControlType = {
    label: string;
    key: string;
    type: "switch" | "input" | "select" | "calendar" | "";
    value: unknown;
    errorMsg?: string;
};

/**
 * @typedef ControlDeviceType
 * @description 장치의 상세정보를 담은 배열
 */
export type ControlDeviceType = Record<string, string | number>;

/**
 * @typedef SecureGuardDetail
 * @property {string} uid 고유아이디
 * @property {string} area 지역
 * @property {string} name 자산이름
 * @property {string} asset_type 자산타입
 * @property {string} node_id 노드 아이디
 * @property {string} auto_ctrl_yn 자동모드 여부
 * @property {CctvInfoType} cctv_info cctv 정보를 담은 배열
 * @property {ControlDeviceType[] | undefined} dvcARCO 냉난방기 상세정보 배열
 * @property {ControlDeviceType[] | undefined} dvcARSS 환경센서 상세정보 배열
 * @property {ControlDeviceType[] | undefined} dvcCHGR 충전기 상세정보 배열
 * @property {ControlDeviceType[] | undefined} dvcLDLT LED조명 상세정보 배열
 * @property {ControlDeviceType[] | undefined} dvcATDR 자동문 상세정보 배열
 * @property {ControlDeviceType[] | undefined} dvcSPGN 태양광패널 상세정보 배열
 * @property {ControlDeviceType[] | undefined} dvcHTBC 온열밴치 상세정보 배열
 */
export interface SecureGuardDetail {
    uid: string;
    area: string;
    name: string;
    asset_type: string;
    node_id: string;
    auto_ctrl_yn: boolean;
    cctv_info: CctvInfoType[];
    dvcARCO?: ControlDeviceType[];
    dvcARSS?: ControlDeviceType[];
    dvcCHGR?: ControlDeviceType[];
    dvcLDLT?: ControlDeviceType[];
    dvcATDR?: ControlDeviceType[];
    dvcSPGN?: ControlDeviceType[];
    dvcHTBC?: ControlDeviceType[];
}

/**
 * @typedef SafeTreeDetail
 * @property {string} uid 고유아이디
 * @property {string} area 지역
 * @property {string} name 자산이름
 * @property {string} asset_type 자산타입
 * @property {string} node_id 노드 아이디
 * @property {string} auto_ctrl_yn 자동모드 여부
 * @property {CctvInfoType} cctv_info cctv 정보를 담은 배열
 * @property {ControlDeviceType[] | undefined} dvcARCO 냉난방기 상세정보 배열
 * @property {ControlDeviceType[] | undefined} dvcARSS 환경센서 상세정보 배열
 * @property {ControlDeviceType[] | undefined} dvcLDLT LED조명 상세정보 배열
 */
export interface SafeTreeDetail {
    uid: string;
    area: string;
    name: string;
    asset_type: string;
    node_id: string;
    auto_ctrl_yn: boolean;
    cctv_info: CctvInfoType[];
    dvcFDLD?: ControlDeviceType[];
    dvcARCO?: ControlDeviceType[];
    dvcARSS?: ControlDeviceType[];
    dvcLDLT?: ControlDeviceType[];
}

/** 방범초소 장비 상세정보 params */
export interface SecurityGuardDetailParams {
    uid: string;
}

/** 방범초소 장비 상세정보 response */
export interface SecureGuardDetailResponse extends CommonResponse {
    response: SecureGuardDetail;
}

/** 안심트리 장비 상세정보 params */
export interface SafeTreeDetailParams {
    uid: string;
}

/** 안심트리 장비 상세정보 response */
export interface SafeTreeDetailResponse extends CommonResponse {
    response: SafeTreeDetail;
}
/** 장비 상세정보 변경 response  */
export interface PostDeviceResponse extends CommonResponse {
    response: ControlDeviceType;
}
