/**
 * 通过 已知视频开始时间 计算进度
 * @param {string} current 视频当前时间
 * @param {string} total 视频总时间
 */
const calcWithTotal = function(current, total) {
    return Math.floor(
        (convertToSeconds(current) * 100) / convertToSeconds(total)
    );
};
/**
 * 通过 已知视频开始时间和要截取的视频长度 计算进度
 * @param {string} current  视频当前时间
 * @param {string,number} temp 要截取的视频长度
 * @param {string} start 视频截取开始时间
 */
const calcWithTemp = function(current, temp, start) {
    const now = convertToSeconds(current);
    const vidoe_time = typeof temp == "number" ? temp : convertToSeconds(temp);
    return Math.floor(
        ((convertToSeconds(current) - convertToSeconds(start)) * 100) /
            vidoe_time
    );
};
/**
 *  00:01:00  转换成  60 秒
 * @param {string} txt 时间txt
 */
const convertToSeconds = function(txt) {
    return txt
        .split(":")
        .reverse()
        .reduce((total, item, i) => total + Math.pow(60, i) * item, 0);
};
/**
 * 判断字符串是否为时间字符串
 * @param {string} time 时间字符串
 */
const isTimeString = function(time) {
    return /\d{2}:\d{2}:\d{2}/.test(time);
};
module.exports = {
    isTimeString,
    calcWithTotal,
    calcWithTemp,
    convertToSeconds
};
