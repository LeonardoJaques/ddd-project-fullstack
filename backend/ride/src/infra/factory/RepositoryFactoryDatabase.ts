import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DriverRepository from "../../application/repository/DriverRepository";
import PassengerRepository from "../../application/repository/PassengerRepository";
import RideRepository from "../../application/repository/RideRepository";
import DriverRepositoryDatabase from "../repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "../repository/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../repository/RideRepositoryDatabase";
import DatabaseConnection from "../repository/database/DatabaseConnection";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {}

  createRideRepository(): RideRepository {
    return new RideRepositoryDatabase(this.connection);
  }
  createPassengerRepository(): PassengerRepository {
    return new PassengerRepositoryDatabase(this.connection);
  }
  createDriverRepository(): DriverRepository {
    return new DriverRepositoryDatabase(this.connection);
  }
}
