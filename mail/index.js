import express from "express";
import nodemailder from "nodemailer";
import yaml from "js-yaml";
import fs from "node:fs";

const router = express.Router();

// 邮件配置
/**
 * @type {import('./mail/mail.yaml').MailConfig}
 * user: "your_email_address"
 * pass: "your_password"
 */
const mailConfig = yaml.load(fs.readFileSync("./mail/mail.yaml", "utf8"));
// 初始化邮件服务
const transPort = nodemailder.createTransport({
    port: 465,
    host: "smtp.163.com",
    secure: true,
    auth: {
        pass: mailConfig.pass,
        user: mailConfig.user,
    },
});

router.post("/", (req, res) => {
    try {
        const body = req.body;
        transPort.sendMail({
            to: body.to, // 目标邮箱地址
            from: mailConfig.user,
            subject: body.subject, // 邮件主题
            text: body.text, // 邮件正文
        });
        res.end("ok");
    } catch (error) {
        console.error("Error parsing JSON data:", error);
        res.statusCode = 400; // Bad Request
        res.end("Invalid JSON data");
    }
});

export default router;
