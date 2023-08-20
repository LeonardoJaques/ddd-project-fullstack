import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";
import PaymentGatewayHttp from "../../infra/gateway/PaymentGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import Queue from "../../infra/queue/Queue";
import AccountGateway from "../gateway/AccountGateway";
import PaymentGateway from "../gateway/PaymentGateway";
import RideRepository from "../repository/RideRepository";

export default class EndRide {
  constructor(
    readonly rideRepository: RideRepository,
    readonly accountGateway: AccountGateway = new AccountGatewayHttp(
      new AxiosAdapter()
    ),
    readonly paymentsGateway: PaymentGateway = new PaymentGatewayHttp(
      new AxiosAdapter()
    ),
    readonly queue: Queue
  ) {}
  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.end(input.date);
    await this.rideRepository.update(ride);
    const amount = ride.calculate();
    const passenger = await this.accountGateway.getPassenger(ride.passengerId);
    const paymentGatewayinput = {
      name: passenger.name,
      email: passenger.email,
      amount,
    };
    await this.queue.publish("rideCompleted", paymentGatewayinput);
  }
}

type Input = {
  rideId: string;
  date: Date;
};
