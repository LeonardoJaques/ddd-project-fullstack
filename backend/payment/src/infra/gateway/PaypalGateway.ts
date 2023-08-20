import crypto from "crypto";
import PaymentGateway, {
  Input,
  Output,
} from "../../application/gateway/PaymentGateway";
export default class PaypalGateway implements PaymentGateway {
  async createTransaction(input: Input): Promise<Output> {
    console.log("Paypal", input.email, input.amount, input.name);
    return {
      transactionId: crypto.randomUUID(),
    };
  }
}
