import UsecaseFactory from "./application/factory/UsecaseFactory";
import CreatePassenger from "./application/usecase/CreatePassenger";
import Registry from "./infra/di/Registry";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import QueueController from "./infra/queue/QueueController";
import RabbitMqAdapter from "./infra/queue/RabbitMqAdapter";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import UserRepositoryDatabase from "./infra/repository/UserRepositoryDatabase";
import PgPromiseAdapter from "./infra/repository/database/PgPromiseAdapter";

//main - composition root
async function main() {
  const port = 3002;
  const connection = new PgPromiseAdapter();
  const queue = new RabbitMqAdapter();
  await queue.connect();
  const repositoryFactory = new RepositoryFactoryDatabase(connection);
  const passengerRepository = new PassengerRepositoryDatabase(connection);
  const userRepository = new UserRepositoryDatabase(connection);
  const usecaseFactory = new UsecaseFactory(repositoryFactory);
  const createPassenger = new CreatePassenger(
    passengerRepository,
    userRepository
  );
  const registy = Registry.getInstance();
  registy.provides("createPassenger", createPassenger);
  const httpServer = new ExpressAdapter();
  new MainController(httpServer, usecaseFactory, queue);
  new QueueController(queue);
  httpServer.listen(port);
}
main();
