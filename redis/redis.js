import express from "express";
import Redis from "ioredis";
import fs from "fs";

const lua = fs.readFileSync("./redis/redis.lua", "utf8");
const redis = new Redis();
const router = express.Router();

// 设置Redis脚本
const REDIS_KEY = "mykey";
const LIMIT = 10;
const EXPIRY = 30;

router.get("/", async (req, res) => {
    redis.eval(lua, 1, REDIS_KEY, LIMIT, EXPIRY, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        if (result) {
            res.send(`11`);
        } else {
            res.send(`重试!!!异常!!!`);
        }
    });
});

export default router;
