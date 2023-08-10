export default class Transaction {
  constructor(
    readonly transactionid: string,
    readonly amount: number,
    readonly name: string,
    readonly email: string
  ) {}
}
