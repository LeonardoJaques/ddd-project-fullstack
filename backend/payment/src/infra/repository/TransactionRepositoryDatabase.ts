import TransactionRepository from "../../application/repository/TransactionRepository";
import Transaction from "../../domain/transaction/Transaction";
import DatabaseConnection from "./database/DatabaseConnection";

export default class TransactionRepositoryDatabase
  implements TransactionRepository
{
  constructor(readonly connection: DatabaseConnection) {}

  async save(transaction: Transaction): Promise<void> {
    await this.connection.query(
      "insert into cccat12.transactions (transaction_id, name, email, amount) values ($1, $2, $3, $4)",
      [
        transaction.transactionId,
        transaction.name,
        transaction.email,
        transaction.amount,
      ]
    );
  }
  async get(transactionId: String): Promise<Transaction> {
    const [transactionData] = await this.connection.query(
      "select * from cccat12.transactions where transaction_id = $1",
      [transactionId]
    );
    console.log("transactionData", transactionData);
    return new Transaction(
      transactionData.transaction_id,
      transactionData.email,
      transactionData.name,
      transactionData.amount
    );
  }
}
