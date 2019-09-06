const {
    isTimeString,
    calcWithTotal,
    calcWithTemp,
    convertToSeconds
} = require("../lib/util/time");

describe("timerUtils", () => {
    test("isTimeString(判断时间字符串)", () => {
        expect(isTimeString("00:00:00")).toBe(true);
        expect(isTimeString(111)).toBe(false);
    });

    test("convertToSeconds(时间转换)", () => {
        expect(convertToSeconds("00:01:00")).toBe(60);
    });

    test("calcWithTotal(计算进度)", () => {
        expect(calcWithTotal("00:01:00", "00:02:00")).toBe(50);
    });

    test("calcWithTemp(通过限定视频长度来计算进度)", () => {
        expect(calcWithTemp("00:0:30", "00:01:00", "00:00:00")).toBe(50);
    });
});
