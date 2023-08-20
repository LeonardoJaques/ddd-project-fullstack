import TransactionRepository from "../repository/TransactionRepository";

export default class GetTransaction {
  constructor(readonly transactionRepository: TransactionRepository) {}

  async execute(input: Input): Promise<Output> {
    console.log(input);
    const transaction = await this.transactionRepository.get(
      input.transactionId
    );

    return {
      transactionId: transaction.transactionId,
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
  transactionId: string;
  name: string;
  email: string;
  amount: number;
};
