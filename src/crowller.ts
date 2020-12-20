class Crowller {
  private secret: string = "x3b174jsx";
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

  constructor() {
    console.log("-- constructor --");
  }
}

const crowller = new Crowller();
