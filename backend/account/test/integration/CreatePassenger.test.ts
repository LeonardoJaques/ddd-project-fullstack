import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";
import PgPromiseAdapter from "../../src/infra/repository/database/PgPromiseAdapter";

test("Deve cadastrar o passageiro", async function () {
  const connection = new PgPromiseAdapter();
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
    password: "123456",
  };
  const usecase = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  const output = await usecase.execute(input);
  expect(output.passengerId).toBeDefined();
  await connection.close();
});

test("Não deve cadastrar o passageiro email inválido", async function () {
  const connection = new PgPromiseAdapter();
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook",
    document: "87175659520",
    password: "123456",
  };
  const usecase = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  expect(async () => await usecase.execute(input)).rejects.toThrowError(
    "Invalid email"
  );
  await connection.close();
});

test("Deve obter o passageiro", async function () {
  const connection = new PgPromiseAdapter();
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
    password: "123456",
  };
  const usecase1 = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  const output1 = await usecase1.execute(input);
  const usecase2 = new GetPassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  const output2 = await usecase2.execute({ passengerId: output1.passengerId });
  expect(output2.name).toBe(input.name);
  expect(output2.email).toBe(input.email);
  expect(output2.document).toBe(input.document);
  await connection.close();
});
