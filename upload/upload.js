import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    // 切片文件存储目录
    destination: (req, file, cb) => {
        cb(null, "chunks/");
    },
    // 切片文件名称
    filename: (req, file, cb) => {
        cb(null, `${req.body.index}-${req.body.fileName}`);
    },
});

const upload = multer({ storage });
const app = express();

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), (req, res) => {
    res.send("ok");
});

app.post("/merge", (req, res) => {
    const chunksPath = "./chunks";

    let files = fs.readdirSync(path.join(process.cwd(), chunksPath));
    files = files.sort((a, b) => a.split("-")[0] - b.split("-")[0]);

    const writePath = path.join(
        process.cwd(),
        `static`,
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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
