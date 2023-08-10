import cors from "cors";
import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";

//framework and Drivers
export default class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }
  on(method: string, url: string, callback: Function): void {
    this.app[method](
      url.replace(/\{|\}/g, ""),
      async function (req: Request, res: Response) {
        try {
          const output = await callback(req.params, req.body);
          res.status(200);
          res.json(output);
        } catch (error: any) {
          res.status(422).send(error.message);
        }
      }
    );
  }
  listen(port: number): void {
    this.app.listen(port, function () {
      return console.log(`Server running on port ${port}`);
    });
  }
}
