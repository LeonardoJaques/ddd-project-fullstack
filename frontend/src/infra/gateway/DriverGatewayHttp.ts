import HttpClient from "../http/HttpClient";
import DriverGateway, { CreateDriverInput } from "./DriverGateway";

export default class DriverGatewayHttp implements DriverGateway {
  constructor(readonly httpClient: HttpClient) {}
  async create(driver: any) {
    const input: CreateDriverInput = {
      name: driver.name.getValue(),
      email: driver.email.getValue(),
      document: driver.document.getValue(),
      carPlate: driver.carPlate.getValue(),
    };
    const output = await this.httpClient.post(
      "http://localhost:3000/drivers",
      input
    );
    return output.driverId;
  }
}
