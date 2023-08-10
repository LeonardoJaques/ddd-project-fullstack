//main composition root

import CreatePassenger from "./application/usecase/CreatePassenger";
import CLIController from "./infra/CLIController";
import NodeInputOutput from "./infra/NodeInputOutput";
import PassengerRepositoryDatabase from "./infra/repository/PassengerRepositoryDatabase";
import PgPromiseAdapter from "./infra/repository/database/PgPromiseAdapter";

const connection = new PgPromiseAdapter();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);
const inputOutput = new NodeInputOutput();
new CLIController(inputOutput, createPassenger);
