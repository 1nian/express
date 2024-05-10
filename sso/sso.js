import express from "express";
import fs from "fs";
import jwt from "jsonwebtoken";

const router = express.Router();

const APP_ID = {
    vue_app: {
        appid: "vueid123",
        secret: "vueid123",
        url: "http://localhost:5173/",
        token: "",
    },
    react_app: {
        appid: "reactid123",
        secret: "reactid123",
        url: "http://localhost:5174/",
        token: "",
    },
};

// 生成token
const getToken = (appid) => {
    return jwt.sign(
        {
            appid,
        },
        APP_ID[appid].secret
    );
};

router.get("/", (req, res) => {
    // 通过 req.session.username 判断是否登录过
    if (req.session.username) {
        const appid = req.query.appID;
        let token;

        if (APP_ID[appid].token) {
            token = APP_ID[appid].token;
        } else {
            token = getToken(appid);
            APP_ID[appid].token = token;
        }

        res.redirect(`${APP_ID[appid].url}?token=${token}`);
        return;
    }

    const html = fs.readFileSync("./sso/sso.html", "utf8");
    res.send(html);
});

router.get("/login", (req, res) => {
    // 解构取值
    const { username, password, appID } = req.query;

    // TODO:判断账号密码是否正确

    //存储用户名称 表示这个账号已经登录过了 下次无需登录
    req.session.username = username;
    // 根据appid生成token
    const token = getToken(appID);
    // 存储token
    APP_ID[appID].token = token;
    // 重定向
    res.redirect(`${APP_ID[appID].url}?token=${token}`);
});

export default router;
