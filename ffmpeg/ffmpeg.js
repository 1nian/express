import { execSync } from "node:child_process";
const ffmpegPth =
    "C:\\Users\\Windows\\Desktop\\ffmpeg\\ffmpeg-7.0-essentials_build\\bin\\ffmpeg.exe";
// 视频格式转换
execSync(`${ffmpegPth} -i test.mp4 test.gif`, {
    stdio: "inherit",
});
// 删除水印
execSync(`${ffmpegPth} -i test.mp4 -vf delogo=w=150:h=70:x=10:y=10 test1.mp4`, {
    stdio: "inherit",
});
