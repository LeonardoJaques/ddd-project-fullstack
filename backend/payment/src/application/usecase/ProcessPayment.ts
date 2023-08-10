import Transaction from "../../domain/transaction/Transaction";
import PaymentGateway from "../gateway/PaymentGateway";
import TransactionRepository from "../repository/TransactionRepository";

export default class ProcessPayment {
  constructor(
    readonly transactionRepository: TransactionRepository,
    readonly paymentGateway: PaymentGateway
  ) {}
  async execute(input: Input): Promise<Output> {
    const outputPaymentgateway = await this.paymentGateway.createTransaction(
      input
    );
    const transaction = new Transaction(
      outputPaymentgateway.transactionId,
      input.amount,
      input.name,
      input.email
    );
    await this.transactionRepository.save(transaction);
    return {
      transactionId: transaction.transactionId,
    };
  }
}

type Input = {
  name: string;
  email: string;
  amount: number;
};

type Output = {
  transactionId: string;
};
