import RepositoryFactory from "../../application/factory/RepositoryFactory";
import TransactionRepository from "../../application/repository/TransactionRepository";
import TransactionRepositoryDatabase from "../repository/TransactionRepositoryDatabase";
import DatabaseConnection from "../repository/database/DatabaseConnection";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) {}
  createTransactionRepository(): TransactionRepository {
    return new TransactionRepositoryDatabase(this.connection);
  }
}
