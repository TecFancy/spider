import fs from "fs";
import path from "path";
import { Router, Request, Response, NextFunction } from "express";
import Analyzer from "./utils/analyzer";
import Crowller from "./utils/crowller";
import { getResponseData } from "./utils/utils";

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.send(getResponseData(null, "请先登陆"));
  }
};

const router = Router();

router.get("/", (req: BodyRequest, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
      <html>
        <body>
        <a href="/getData">爬取内容</a>
        <a href="/showData">展示内容</a>
        <a href="/logout">退出</a>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <body>
          <form method="post" action="/login">
            <input type="password" name="password" />
            <button>提交</button>
          </form>
        </body>
      </html>
    `);
  }
});

router.get("/logout", (req: BodyRequest, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.send(getResponseData(true));
});

router.post("/login", (req: BodyRequest, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;

  if (isLogin) {
    res.send(getResponseData(null, "已经登陆过"));
  } else {
    if (password === "123" && req.session) {
      req.session.login = true;
      res.send(getResponseData(true));
    } else {
      res.send(getResponseData(false, "登陆失败"));
    }
  }
});

router.get("/getData", checkLogin, (req: BodyRequest, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  const secret: string = "x3b174jsx";
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  const analyzer = Analyzer.getInstance();
  new Crowller(url, analyzer);
  res.send(getResponseData(true));
});

router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  try {
    const position = path.resolve(__dirname, "../data/course.json");
    const result = fs.readFileSync(position, "utf-8");
    res.send(getResponseData(JSON.parse(result)));
  } catch (error) {
    res.send(getResponseData(false, "数据不存在"));
  }
});

export default router;
