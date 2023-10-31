import { KeyProperty } from "../interfaces/common.interface";
import { ControlDeviceType } from "../interfaces/control.interface";

import { deviceProperty, oprtModeOptions, oprtOptions, timeDaySelectArray, windStrOptions } from "./constant";
import { makeDayString, makeTimeString } from "./utils";

/**
 * @name searchDataByProPerty
 * @param deviceEnName 장비의 영문이름
 * @param keyString 찾고싶은 데이터의 key 값
 * @returns 찾고싶은 key값의 value를 찾아서 리턴
 * @description 찾고싶은 데이터의 key값을 통해 특정데이터를 찾는 함수
 */
export const searchDataByProPerty = (deviceEnName: string, keyString: keyof KeyProperty) => {
    const findObject = deviceProperty.find(property => property.enName === deviceEnName);
    return findObject ? findObject[keyString] : "";
};

/**
 * @function
 * @name combineProperties
 * @param {ControlDeviceType} deviceInfo 장치상세정보
 * @returns 가공한 정보를 다시 리턴함
 * @description 시간, 날짜 등의 데이터를 형식에 맞게 표시하기 위해 실행하는 함수
 */
export const combineProperties = (deviceInfo: ControlDeviceType) => {
    const {
        dvcId,
        dvcTypeNm,
        oprtStHm,
        oprtEdHm,
        oprtStHm2,
        oprtEdHm2,
        coolStMd,
        coolEdMd,
        oprtStMd,
        oprtEdMd,
        heatStMd,
        heatEdMd,
        ...rest
    } = deviceInfo;
    // TODO: 안쓰는 변수는 삭제해야함
    dvcId;
    dvcTypeNm;

    let oprtHm;
    let oprtHm2;
    let coolMd;
    let oprtMd;
    let heatMd;

    if (oprtStHm && oprtEdHm) {
        oprtHm = `${makeTimeString(oprtStHm as string)} ~ ${makeTimeString(oprtEdHm as string)}`;
    }
    if (oprtStHm2 && oprtEdHm2) {
        oprtHm2 = `${makeTimeString(oprtStHm2 as string)} ~ ${makeTimeString(oprtEdHm2 as string)}`;
    }
    if (coolStMd && coolEdMd) {
        coolMd = `${makeDayString(coolStMd as string)} ~ ${makeDayString(coolEdMd as string)}`;
    }
    if (heatStMd && heatEdMd) {
        heatMd = `${makeDayString(heatStMd as string)} ~ ${makeDayString(heatEdMd as string)}`;
    }
    if (oprtEdMd && oprtStMd) {
        oprtMd = `${makeDayString(oprtStMd as string)} ~ ${makeDayString(oprtEdMd as string)}`;
    }

    if (oprtHm && coolMd && heatMd) {
        return { ...rest, oprtHm, coolMd, heatMd };
    }
    if (oprtHm && oprtMd) {
        return { ...rest, oprtHm, oprtMd };
    }

    if (oprtHm && oprtHm2) {
        return { ...rest, oprtHm, oprtHm2 };
    }
    if (oprtHm && !oprtHm2) {
        return { ...rest, oprtHm };
    }

    if (!oprtHm && oprtHm2) {
        return { ...rest, oprtHm2 };
    }
    return { ...rest };
};

/**
 * @name calculateColSpan
 * @param {Record<string, string | number>} valueData colspan이 가지고 있는 데이터 세트
 * @returns colSpan 값
 * @description 인자로 들어오는 객체 속성 갯수에 따라 colspan 값을 도출
 */
export const calculateColSpan = (valueData: Record<string, string | number>) => {
    const valueLength = Object.entries(combineProperties(valueData)).length;
    if (valueLength > 6) {
        return 12;
    } else if (valueLength <= 6 && valueLength > 3) {
        return 6;
    } else if (valueLength === 3) {
        return 4;
    } else {
        return 3;
    }
};

/**
 * @name printStatLabel
 * @param key key 값
 * @param value value 값
 * @returns {string} 데이터를 가공한 문자열
 * @description 데이터 표시 시 그대로 표시하면 안되고 가공이 필요한 경우의 수를 처리하기 위한 함수
 */
export const printStatLabel = (key: string, value: string | number, dcvType?: string) => {
    const dimension = searchDataByProPerty(key, "dimension");

    if (!["pwr", "oprt", "oprtMode", "windSts", "auto"].includes(key)) {
        if (typeof value === "number") {
            return `${Math.floor(value)}${dimension || ""}`;
        } else {
            return `${value}${dimension || ""}`;
        }
    } else {
        let label = "";
        if (key === "pwr") {
            label = value === 1 ? "ON" : "OFF";
        } else if (key === "oprt") {
            label = value === 1 ? "ON" : "OFF";
        } else if (key === "auto") {
            label = value === 1 ? "자동" : "수동";
        } else if (key === "oprtMode") {
            label = oprtOptions[Number(value)] ? oprtOptions[Number(value)].label : "-";
            if (dcvType === "dvcATDR") {
                label = oprtModeOptions[Number(value)] ? oprtModeOptions[Number(value)].label : "-";
            }
        } else if (key === "windSts") {
            label = windStrOptions[Number(value) - 1] ? windStrOptions[Number(value) - 1].label : "-";
        }

        return `${label}${dimension || ""}`;
    }
};

/**
 * @name checkArrayOption
 * @param {string[]} checkArray 기준이 되어줄 배열
 * @param {string} keyValue key 값 문자열
 * @returns 배열에 key값 문자열이 포함되어 있는지 아닌지 boolean 타입의 값을 도출
 */
export const checkArrayOption = (checkArray: string[], keyValue: string) => {
    return checkArray.includes(keyValue);
};

/**
 * @name transformOpacity
 * @param {string} keyString key문자열 값
 * @returns {number} opacity 값
 * @description 제어모드, key문자열 값에 따라 opacity 값을 도출
 */
export const transformOpacity = (keyString: string, modeState: number) => {
    if (checkArrayOption(timeDaySelectArray, keyString)) {
        return modeState === 1 ? 1 : 0.5;
    } else if (keyString === "fineDust" || keyString === "ufineDust") {
        return 1;
    } else {
        return modeState === 1 ? 0.5 : 1;
    }
};

/**
 * @name transformDateString
 * @description 날짜 (ex. 1221) 형태를 다른 날짜형태 (2023-12-21)로 바꿔주는 함수
 * @param {string} dateString 네자리 숫자로 구성된 문자열(날짜데이터)
 * @returns {string} 특정 날짜형식 문자열
 */
export const transformDateString = (dateString: string) => {
    const newString = dateString;
    const newDay = new Date(`${new Date().getFullYear()}-${newString.slice(0, 2)}-${newString.slice(2)}`);
    return `${newDay.toISOString().split("T")[0]}`;
};
