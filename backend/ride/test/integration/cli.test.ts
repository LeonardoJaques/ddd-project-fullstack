import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import CLIController from "../../src/infra/cli/CLIController";
import InputOutput from "../../src/infra/cli/inputOutput";

import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import PgPromiseAdapter from "../../src/infra/repository/database/PgPromiseAdapter";

test("Deve criar um passageiro usando o cli", async function () {
  const output: any[] = [];
  const connection = new PgPromiseAdapter();
  const passengerRepository = new PassengerRepositoryDatabase(connection);
  const createPassenger = new CreatePassenger(passengerRepository);
  const inputOutput = new (class extends InputOutput {
    write(text: string): void {
      output.push(JSON.parse(text));
    }
  })();
  new CLIController(inputOutput, createPassenger);
  await inputOutput.type("create-passenger ana ana@gmail.com 83432616074");
  expect(output.at(0)).toBeDefined();
  await connection.close();
});
