export default class Transaction {
  constructor(
    readonly transactionId: string,
    readonly amount: number,
    readonly name: string,
    readonly email: string
  ) {}
}
