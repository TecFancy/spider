import Crowller from "./crowller";
import DellAnalyzer from "./dellAnalyzer";

const secret: string = "x3b174jsx";
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = DellAnalyzer.getInstance();
new Crowller(url, analyzer);
