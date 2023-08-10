import GetTransaction from "./application/usecase/GetTransaction";
import ProcessPayment from "./application/usecase/ProcessPayment";
import Registry from "./infra/di/Registry";
import PaypalGateway from "./infra/gateway/PaypalGateway";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import TransactionRepositoryDatabase from "./infra/repository/TransactionRepositoryDatabase";
import PgPromiseAdapter from "./infra/repository/database/PgPromiseAdapter";

//main - composition root
const connection = new PgPromiseAdapter();
const transactionRepository = new TransactionRepositoryDatabase(connection);
const registry = Registry.getInstance();
const paymentGateway = new PaypalGateway();
const processPayments = new ProcessPayment(
  transactionRepository,
  paymentGateway
);
const getTransaction = new GetTransaction(transactionRepository);
registry.provide("processPayment", processPayments);
registry.provide("getTransaction", getTransaction);
const httpServer = new ExpressAdapter();
new MainController(httpServer);
const port = 3001;
httpServer.listen(port);
