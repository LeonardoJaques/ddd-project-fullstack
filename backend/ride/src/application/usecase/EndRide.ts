import PaymentGatewayHttp from "../../infra/gateway/PaymentGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import PaymentGateway from "../gateway/PaymentGateway";
import PassengerRepository from "../repository/PassengerRepository";
import RideRepository from "../repository/RideRepository";

export default class EndRide {
  constructor(
    readonly rideRepository: RideRepository,
    readonly passengerRepository: PassengerRepository,
    readonly paymentsGateway: PaymentGateway = new PaymentGatewayHttp(
      new AxiosAdapter()
    )
  ) {}
  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.end(input.date);
    await this.rideRepository.update(ride);
    const passenger = await this.passengerRepository.get(ride.passengerId);
    const amount = ride.calculate();
    const paymentgatwayinput = {
      name: passenger.name,
      email: passenger.email.value,
      amount,
    };
    await this.paymentsGateway.process(paymentgatwayinput);
  }
}

type Input = {
  rideId: string;
  date: Date;
};
