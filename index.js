const { spawn } = require("child_process");
const inquirer = require("inquirer");
const ProgressBar = require("progress");

const chalk = require("chalk");
const { log } = console;

const { calcWithTotal, calcWithTemp } = require("./lib/util/time");

const questions = [
    {
        type: "input",
        name: "sourceUrl",
        message: "请输入要处理视频的地址:",
        validate: function(input) {
            if (!input) {
                return "处理视频的地址不能为空";
            }
            return true;
        },
        default:
            "http://meigui.qqqq-kuyun.com/20190904/17379_b2211558/index.m3u8"
    },
    {
        type: "confirm",
        name: "isNeedCut",
        message: "是否需要截取视频?"
    },
    {
        type: "input",
        name: "startTime",
        message: "开始时间:",
        when: function(answers) {
            return answers.isNeedCut;
        },
        default: "00:00:00",
        validate: function(input) {
            if (!input) {
                return "处理视频的地址不能为空";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "endTime",
        message: "视频长度(秒):",
        when: function(answers) {
            return answers.isNeedCut;
        }
    },
    {
        type: "input",
        name: "resultName",
        message: "输出结果视频的名称:",
        default: function() {
            const now = new Date().getTime();
            return `${now}.mp4`;
        }
    }
];

(async function() {
    const {
        sourceUrl,
        isNeedCut,
        startTime,
        endTime,
        resultName
    } = await inquirer.prompt(questions);

    let args = ["-i", sourceUrl];
    if (isNeedCut) {
        startTime && args.push("-ss", startTime);
        endTime && args.push("-t", endTime);
    }
    args.push(resultName);
    if (args.length == 0) throw new Error("ffmpegSpawn 缺少参数");
    log(chalk`commond run: {rgb(255,131,0) ffmpeg ${args.join(" ")}}`);

    const bar = new ProgressBar(":bar :percent", {
        total: 50,
        complete: chalk.green("█"),
        incomplete: " "
    });

    let total = endTime; //等于视频时间长度
    let current = "";

    const ls = spawn("ffmpeg", args, {
        cwd: __dirname
        // stdio: "inherit"
    });

    ls.stderr.on("data", data => {
        const d = data.toString();
        if (!endTime && /Duration: (\d{2}:\d{2}:\d{2})/.test(d)) {
            total = d.match(/Duration: (\d{2}:\d{2}:\d{2})/)[1];
        }

        if (/time=(\d{2}:\d{2}:\d{2})/.test(d)) {
            current = d.match(/time=(\d{2}:\d{2}:\d{2})/)[1];
            !endTime
                ? bar.update(calcWithTotal(current, total) / 100)
                : bar.update(calcWithTemp(current, total, startTime) / 100);
        }
    });

    ls.on("close", code => {
        if (!bar.complete) {
            //如果结束进度条未完成直接结束
            bar.update(1);
        }
        log(chalk.green("🎉 1567784572551.mp4转换结束 ！！"));
    });
})();

/**
 * 获取最新answer的结果
 * @param {string} k question 的key
 */
const getAnswer = function(k) {
    return function(answers) {
        return answers[k];
    };
};
/**
 *  ffmpeg 执行命令的封装
 * @param {Array} args ffmpeg 要执行的参数
 * @param {Array} param1  [视频开始时间，视频截取时间]
 */
const ffmpegSpawn = function(args, [startTime, endTime]) {
    if (args.length == 0) throw new Error("ffmpegSpawn 缺少参数");
    log(chalk`commond run: {rgb(255,131,0) ffmpeg ${args.join(" ")}}`);

    const bar = new ProgressBar(":bar :percent", {
        total: 50,
        complete: chalk.green("█"),
        incomplete: " "
    });

    let total = endTime; //等于视频时间长度
    let current = "";

    const ls = spawn("ffmpeg", args, {
        cwd: __dirname
        // stdio: "inherit"
    });

    ls.stderr.on("data", data => {
        const d = data.toString();
        if (!endTime && /Duration: (\d{2}:\d{2}:\d{2})/.test(d)) {
            total = d.match(/Duration: (\d{2}:\d{2}:\d{2})/)[1];
        }

        if (/time=(\d{2}:\d{2}:\d{2})/.test(d)) {
            current = d.match(/time=(\d{2}:\d{2}:\d{2})/)[1];
            !endTime
                ? bar.update(calcWithTotal(current, total) / 100)
                : bar.update(calcWithTemp(current, total, startTime) / 100);
        }
    });

    ls.on("close", code => {
        if (!bar.complete) {
            //如果结束进度条未完成直接结束
            bar.update(1);
        }
        log(chalk.green("🎉 1567784572551.mp4转换结束 ！！"));
    });
    return;
};
