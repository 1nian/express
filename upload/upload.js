import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    // 切片文件存储目录
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/chunks/`);
    },
    // 切片文件名称
    filename: (req, file, cb) => {
        cb(null, `${req.body.index}-${req.body.fileName}`);
    },
});

const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
    res.send("ok");
});

router.post("/merge", (req, res) => {
    const chunksPath = "./upload/chunks";

    let files = fs.readdirSync(path.join(process.cwd(), chunksPath));
    files = files.sort((a, b) => a.split("-")[0] - b.split("-")[0]);

    const writePath = path.join(
        process.cwd(),
        `upload/static`,
        `${new Date().getTime()}.${req.body.type}`
    );
    files.forEach((item) => {
        fs.appendFileSync(
            writePath,
            fs.readFileSync(path.join(process.cwd(), chunksPath, item))
        );
        fs.unlinkSync(path.join(process.cwd(), chunksPath, item));
    });

    res.send("ok");
});

export default router;
