import TransactionRepository from "../repository/TransactionRepository";

export default class GetTransaction {
  constructor(readonly transactionRepository: TransactionRepository) {}
  async execute(input: Input): Promise<Output> {
    const transaction = await this.transactionRepository.get(
      input.transactionId
    );
    return {
      name: transaction.name,
      email: transaction.email,
      amount: transaction.amount,
    };
  }
}
type Input = {
  transactionId: string;
};

type Output = {
  name: string;
  email: string;
  amount: number;
};
