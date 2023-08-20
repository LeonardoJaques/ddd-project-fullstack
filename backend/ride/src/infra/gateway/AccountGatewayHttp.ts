import AccountGateway, {
  Driver,
  Passenger,
} from "../../application/gateway/AccountGateway";
import HttpClient from "../http/HttpClient";

export default class AccountGatewayHttp implements AccountGateway {
  constructor(readonly httpClient: HttpClient) {}

  async getPassenger(passengerId: string): Promise<Passenger> {
    const output = await this.httpClient.get(
      `http://localhost:3002/passengers/${passengerId}`
    );
    console.log("passengerId", output);
    return output;
  }
  async getDriver(driverId: string): Promise<Driver> {
    const output = await this.httpClient.get(
      `http://localhost:3002/drivers/${driverId}`
    );
    return output;
  }

  createPassenger(input: any): Promise<any> {
    return this.httpClient.post(`http://localhost:3002/passengers`, input);
  }
  createDriver(input: any): Promise<any> {
    return this.httpClient.post(`http://localhost:3002/drivers`, input);
  }
}
