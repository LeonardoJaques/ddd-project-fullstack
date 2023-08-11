import AccountGatewayHttp from "../../infra/gateway/AccountGatewayHttp";
import AxiosAdapter from "../../infra/http/AxiosAdapter";
import RepositoryFactory from "../factory/RepositoryFactory";
import AccountGateway from "../gateway/AccountGateway";
import RideRepository from "../repository/RideRepository";

export default class GetRide {
  rideRepository: RideRepository;

  constructor(
    readonly repository: RepositoryFactory,
    readonly accountGateway: AccountGateway = new AccountGatewayHttp(
      new AxiosAdapter()
    )
  ) {
    this.rideRepository = repository.createRideRepository();
  }
  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    const passenger = await this.accountGateway.getPassenger(ride.passengerId);
    let driver;
    if (ride.driverId) {
      driver = await this.accountGateway.getDriver(ride.driverId);
    }
    return {
      rideId: ride.rideId,
      driverId: ride.driverId,
      passengerId: ride.passengerId,
      status: ride.status.values,
      requestDate: ride.requestDate,
      acceptDate: ride.acceptDate,
      startDate: ride.startDate,
      endDate: ride.endDate,
      passenger: passenger.name,
      driver: driver?.name,
    };
  }
}
type Input = {
  rideId: string;
};
type Output = {
  rideId: string;
  driverId?: string;
  passengerId?: string;
  acceptDate?: Date;
  status: string;
  requestDate: Date;
  startDate?: Date;
  endDate?: Date;
  passenger?: string;
  driver?: string;
};
