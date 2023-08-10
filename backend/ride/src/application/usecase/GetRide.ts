import RepositoryFactory from "../factory/RepositoryFactory";
import DriverRepository from "../repository/DriverRepository";
import PassengerRepository from "../repository/PassengerRepository";
import RideRepository from "../repository/RideRepository";

export default class GetRide {
  rideRepository: RideRepository;
  passengerRepository: PassengerRepository;
  driverRepository: DriverRepository;

  constructor(readonly repository: RepositoryFactory) {
    this.rideRepository = repository.createRideRepository();
    this.passengerRepository = repository.createPassengerRepository();
    this.driverRepository = repository.createDriverRepository();
  }
  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    const passenger = await this.passengerRepository.get(ride.passengerId);
    let driver;
    if (ride.driverId) {
      driver = await this.driverRepository.get(ride.driverId);
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
