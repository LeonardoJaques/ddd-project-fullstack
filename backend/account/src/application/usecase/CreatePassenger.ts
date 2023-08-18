import Passenger from "../../domain/passenger/Passenger";
import User from "../../domain/user/User";
import PassengerRepository from "../repository/PassengerRepository";
import UserRepository from "../repository/UserRepository";

export default class CreatePassenger {
  constructor(
    readonly passengerRepository: PassengerRepository,
    readonly userRepository: UserRepository
  ) {}
  async execute(input: Input): Promise<Output> {
    //unit of work
    //operações de compensação - SAGA
    const passenger = Passenger.create(input.name, input.email, input.document);
    if (input.password) {
      const user = User.create(input.email, input.password, "pbkdf2");
      await this.userRepository.save(user);
    }
    await this.passengerRepository.save(passenger);
    return { passengerId: passenger.passengerId };
  }
}
type Input = {
  name: string;
  email: string;
  document: string;
  password?: string;
};
type Output = {
  passengerId: string;
};
