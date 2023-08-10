import PaymentGateway, {
  Input,
  Output,
} from "../../application/gateway/PaymentGateway";

import crypto from "crypto";

export default class PaypalGateway implements PaymentGateway {
  async createTransaction(input: Input): Promise<Output> {
    console.log("Paypal", input);
    return {
      transactionId: crypto.randomUUID(),
    };
  }
}
