import GetTransaction from "./application/usecase/GetTransaction";
import ProcessPayment from "./application/usecase/ProcessPayment";
import Registry from "./infra/di/Registry";
import PaypalGateway from "./infra/gateway/PaypalGateway";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import QueueController from "./infra/queue/QueueController";
import RabbitMqAdapter from "./infra/queue/RabbitMqAdapter";
import TransactionRepository from "./infra/repository/TransactionRepositoryDatabase";
import PgPromiseAdapter from "./infra/repository/database/PgPromiseAdapter";

//main - composition root
async function main() {
  const connection = new PgPromiseAdapter();
  const queue = new RabbitMqAdapter();
  await queue.connect();
  const transactionRepository = new TransactionRepository(connection);
  const registry = Registry.getInstance();
  const paymentGateway = new PaypalGateway();
  const processPayment = new ProcessPayment(
    transactionRepository,
    paymentGateway
  );
  const getTransaction = new GetTransaction(transactionRepository);
  registry.provide("processPayment", processPayment);
  registry.provide("getTransaction", getTransaction);
  const httpServer = new ExpressAdapter();
  new QueueController(queue);
  new MainController(httpServer);
  const port = 3001;
  httpServer.listen(port);
}
main();
