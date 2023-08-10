import PaymentGateway, {
  Input,
} from "../../application/gateway/PaymentGateway";
import HttpClient from "../http/HttpClient";

export default class PaymentGatewayHttp implements PaymentGateway {
  constructor(readonly httpClient: HttpClient) {}
  async process(input: Input): Promise<void> {
    await this.httpClient.post("http://3001/process_payment", input);
  }
}
