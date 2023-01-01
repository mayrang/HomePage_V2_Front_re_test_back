import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { AppDataSource } from "./data-source";

const app = express();

dotenv.config();


app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());



app.get("/", (_, res) => res.send("back server"));




let port = 4000;

app.listen(port, async () => {
    console.log(`Server running ${port} Port`);
    AppDataSource.initialize()
    .then(() => {
        console.log("database init!");
    })
    .catch((err) => {
        console.log(err);
    })
})