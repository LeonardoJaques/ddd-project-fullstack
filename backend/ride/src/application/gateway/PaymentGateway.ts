export default interface PaymentGateway {
  process(input: Input): Promise<Output>;
}

export type Input = {
  name: string;
  email: string;
  amount: number;
};
export type Output = {
  transactionId: string;
};
