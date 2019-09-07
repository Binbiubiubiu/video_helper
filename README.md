# video_helper
a video tool
## Install

```
brew install ffmpeg

yarn link

```
## Usage

video-convert

```
? 请输入要处理视频的地址: http://meigui.qqqq-kuyun.com/20190904/17379_b2211558/index.m3u8
? 是否需要截取视频? Yes
? 开始时间: 00:00:00
? 结束时间: 00:01:00
? 输出结果视频的名称: 1567704916241.mp4
```
#### youtube 字幕合成命令

```
ffmpeg -i source.mp4 -vf subtitles=word.srt result.mp4
```


