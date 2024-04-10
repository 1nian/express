import express from "express";
import cors from "cors";
import upload from "./upload/upload.js";

const app = express();
const prot = 3000;

app.use(cors());
app.use(express.json());
app.use("/upload", upload);

app.get("/", (req, res) => {
    res.send("Hello Node!");
});

app.listen(prot, () => {
    console.log(`http://localhost:${prot}`);
});
