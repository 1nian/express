import puppeteer from "puppeteer";
import fs from "node:fs";

// 延迟加载
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 获取class文本
const getInnerText = async (el, type = "innerText") => {
    const property = await el.getProperty(type);
    const text = await property.jsonValue();
    return text;
};

// 文本存储
const saveText = async (title, text) => {
    let texts = title + "\n" + text + "\n" + "\n";
    fs.appendFile("./text.txt", texts, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
};

const init = async (pageUrl) => {
    // 创建浏览器
    const browser = await puppeteer.launch();
    // 新建页面
    const page = await browser.newPage();
    // 设置宽高
    await page.setViewport({ width: 1920, height: 1080 });
    // 跳转页面
    await page.goto(pageUrl);
    // 等待元素加载完成
    await page.waitForSelector(".content");
    let titleClass = await page.$(".content .wap_none");
    let contentClass = await page.$(".content #chaptercontent");
    let nextClass = await page.$(".content #pb_next");
    // 获取title文本
    let title = await getInnerText(titleClass);
    // 获取content文本
    let content = await getInnerText(contentClass);
    // 获取next文本
    let next = await getInnerText(nextClass, "href");
    let nextArr = next.split(".html");

    // 保存到文件
    await saveText(title, content);

    if (next && nextArr?.length > 1) {
        await delay(5000);
        await init(next);
    }
    await browser.close();
};
await init("https://www.biqg.cc/book/6909/1.html");
