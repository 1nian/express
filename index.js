import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";

import upload from "./upload/upload.js";
import sso from "./sso/sso.js";
import redis from "./redis/redis.js";

const app = express();
const prot = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    session({
        secret: "testexpress*%$",
        cookie: { maxAge: 60000 * 365 * 7 * 24 },
        resave: false,
        saveUninitialized: false,
    })
);
app.use("/upload", upload);
app.use("/sso", sso);
app.use("/redis", redis);

app.get("/", (req, res) => {
    res.send("Hello Node!");
});

app.listen(prot, () => {
    console.log(`http://localhost:${prot}`);
});
