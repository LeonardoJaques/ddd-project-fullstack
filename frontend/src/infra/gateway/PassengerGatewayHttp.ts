import Passenger from "../../domain/passenger/Passenger";
import HttpClient from "../http/HttpClient";
import PassengerGateway, { CreatePassengerInput } from "./PassengerGateway";

export default class PassengerGatewayHttp implements PassengerGateway {
  constructor(readonly httpClient: HttpClient) {}
  async create(passenger: Passenger) {
    const input: CreatePassengerInput = {
      name: passenger.name.getValue(),
      email: passenger.email.getValue(),
      document: passenger.document.getValue(),
    };
    const passengerData = await this.httpClient.post(
      "http://localhost:3000/passengers",
      input
    );
    return passengerData.passengerId;
  }
}
