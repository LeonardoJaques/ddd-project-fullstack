import UsecaseFactory from "./application/factory/UsecaseFactory";
import CalculateRide from "./application/usecase/CalculateRide";
import CreatePassenger from "./application/usecase/CreatePassenger";
import Registry from "./infra/di/Registry";
import RepositoryFactoryDatabase from "./infra/factory/RepositoryFactoryDatabase";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import PgPromiseAdapter from "./infra/repository/database/PgPromiseAdapter";

//main - composition root
const port = 3000;
const connection = new PgPromiseAdapter();
const repositoryFactory = new RepositoryFactoryDatabase(connection);
const passengerRepository = new PassengerRepositoryDatabase(connection);
const usecaseFactory = new UsecaseFactory(repositoryFactory);
const calculateRide = new CalculateRide();
const createPassenger = new CreatePassenger(passengerRepository);
const registy = Registry.getInstance();
registy.provides("calculateRide", calculateRide);
registy.provides("createPassenger", createPassenger);
const httpServer = new ExpressAdapter();
new MainController(httpServer, usecaseFactory);
httpServer.listen(port);
