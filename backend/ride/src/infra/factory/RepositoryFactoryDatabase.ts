import RepositoryFactory from "../../application/factory/RepositoryFactory";
import RideRepository from "../../application/repository/RideRepository";
import RideRepositoryDatabase from "../repository/RideRepositoryDatabase";
import DatabaseConnection from "../repository/database/DatabaseConnection";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {}

  createRideRepository(): RideRepository {
    return new RideRepositoryDatabase(this.connection);
  }
}
