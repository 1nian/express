import puppeteer from "puppeteer";

// 延迟加载
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

// 获取文本
const getInnerText = async (el) => {
    const property = await el.getProperty("innerText");
    const text = await property.jsonValue();
    return text;
};

const init = async () => {
    // 创建浏览器
    const browser = await puppeteer.launch({ headless: false });
    // 新建页面
    const page = await browser.newPage();
    // 设置宽高
    await page.setViewport({ width: 1920, height: 1080 });
    // 跳转页面
    await page.goto("https://www.biqg.cc/book/6909/1.html");
    // 等待元素加载完成
    await page.waitForSelector(".content");
    let titleClass = await page.$(".content .wap_none");
    let contentClass = await page.$(".content #chaptercontent");
    // 获取文本
    let title = await getInnerText(titleClass);
    console.log(title, "----title");
    let content = await getInnerText(contentClass);
    console.log(content, "----content");
    // 截图
    await page.screenshot({ path: "example.png", fullPage: true });

    // await browser.close();
};
init();
