import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import router from "./router";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ['teacher dell'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 100, // 24 hours
  })
);
app.use(router);

app.listen(7001, () => {
  console.log("Server is running.");
});
