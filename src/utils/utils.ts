/**
 * @name makeTimeString
 * @param {string} timeString 시간정보 문자열
 * @returns {string} 변경된 시간 정보
 * @description 문자열에 시간형식 입히는 함수 ex) 1200 => 12:00
 */
export function makeTimeString(timeString: string) {
    const timeString2 = timeString;
    return `${timeString.slice(0, 2)}:${timeString2.slice(2)}`;
}

/**
 * @name makeDayString
 * @param {string} timeString 날짜정보 문자열
 * @returns {string} 변경된 날짜 정보
 * @description 문자열에 날짜형식 입히는 함수 ex) 10/23 => 10/23
 */
export function makeDayString(timeString: string) {
    const timeString2 = timeString;
    return `${timeString.slice(0, 2)}/${timeString2.slice(2)}`;
}

/**
 * @name configureUr
 * @param {object} / API의 url 주소 담긴 객체
 * @returns {string} 환경에 따라 API의 url 주소 리턴
 * @description 환경이 test, development 에 따라 API의 url 주소를 리턴하는 함수
 */
export const configureUrl = ({ testUrl, url }: { testUrl: string; url: string }) => {
    let finalUrl: string;
    if (process.env.NODE_ENV === "test") {
        finalUrl = testUrl;
    } else if (process.env.NODE_ENV === "development") {
        finalUrl = url;
    } else {
        finalUrl = url;
    }
    return finalUrl;
};

/**
 * @name makeTestUrl
 * @param {string} path test환경에서 실행될 API url주소
 * @returns {string} 환경에 따라 API의 url 주소 리턴
 * @description 온전한 API의 url 문자열을 만드는 함수
 */
export function makeTestUrl(path: string) {
    return `${path}`;
}
