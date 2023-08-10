import UsecaseFactory from "../../application/factory/UsecaseFactory";
import CalculateRide from "../../application/usecase/CalculateRide";
import CreatePassenger from "../../application/usecase/CreatePassenger";
import inject from "../di/Inject";
import HttpServer from "./HttpServer";

export default class MainController {
  @inject("calculateRide")
  calculateRide?: CalculateRide;
  @inject("createPassenger")
  createPassenger?: CreatePassenger;
  constructor(httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
    //driver, primary actor, inbound adapter
    httpServer.on("post", "/calculate_ride", async (params: any, body: any) => {
      const output = await this.calculateRide?.execute(body);
      return output;
    });

    httpServer.on("post", "/passengers", async (params: any, body: any) => {
      const output = await this.createPassenger?.execute(body);
      return output;
    });

    httpServer.on(
      "get",
      "/passengers/:{passengerId}",
      async function (params: any, body: any) {
        const output = await usecaseFactory.createGetPassenger().execute({
          passengerId: params.passengerId,
        });
        return output;
      }
    );

    httpServer.on("post", "/drivers", async (params: any, body: any) => {
      const output = await usecaseFactory.createCreateDriver().execute(body);
      return output;
    });
    httpServer.on(
      "get",
      "/drivers/:{driverId}",
      async (params: any, body: any) => {
        const output = await usecaseFactory
          .createGetDriver()
          .execute({ driverId: params.driverId });
        return output;
      }
    );
    httpServer.on("post", "/request_ride", async (params: any, body: any) => {
      const output = await usecaseFactory.createRequestRide().execute(body);
      return output;
    });
  }
}