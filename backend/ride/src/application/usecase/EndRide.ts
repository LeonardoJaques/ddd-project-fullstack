import Transaction from "../../domain/transaction/Transaction";
import MailGateway from "../gateway/MailGateway";
import PaymentGateway from "../gateway/PaymentGateway";
import PassengerRepository from "../repository/PassengerRepository";
import RideRepository from "../repository/RideRepository";
import TransactionRepository from "../repository/TransactionRepository";

export default class EndRide {
  constructor(
    readonly rideRepository: RideRepository,
    readonly paymentsGateway: PaymentGateway,
    readonly passengerRepository: PassengerRepository,
    readonly transactionRepository: TransactionRepository,
    readonly mailGateway: MailGateway
  ) {}
  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.end(input.date);
    await this.rideRepository.update(ride);
    const passenger = await this.passengerRepository.get(ride.passengerId);
    const amount = ride.calculate();
    // big ball of mud
    const paymentgatwayinput = {
      name: passenger.name,
      email: passenger.email.value,
      amount,
    };

    const outputPaymentgateway = await this.paymentsGateway.process(
      paymentgatwayinput
    );
    const transaction = new Transaction(
      outputPaymentgateway.transactionId,
      amount,
      passenger.name,
      passenger.email.value
    );
    await this.transactionRepository.save(transaction);
    const message = `Dear ${passenger.name} ride has ended. You were charged ${amount}`;
    await this.mailGateway.send(message, passenger.email.value);
    //
  }
}

type Input = {
  rideId: string;
  date: Date;
};
