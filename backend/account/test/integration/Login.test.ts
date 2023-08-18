import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetSession from "../../src/application/usecase/GetSession";
import Login from "../../src/application/usecase/Login";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";
import PgPromiseAdapter from "../../src/infra/repository/database/PgPromiseAdapter";

test("Deve fazer o login", async () => {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
    password: "12345",
  };
  const connection = new PgPromiseAdapter();
  const createPassenger = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  await createPassenger.execute(input);
  const inputLogin = {
    email: "john.doe@outlook.com",
    password: "12345",
  };
  const login = new Login(new UserRepositoryDatabase(connection));
  const outputLogin = await login.execute(inputLogin);
  expect(outputLogin.token).toBeDefined();
  console.log(outputLogin.token);
  await connection.close();
});
test("Deve fazer o login e validar se o usuraio esta logado", async () => {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
    password: "12345",
  };
  const connection = new PgPromiseAdapter();
  const createPassenger = new CreatePassenger(
    new PassengerRepositoryDatabase(connection),
    new UserRepositoryDatabase(connection)
  );
  await createPassenger.execute(input);
  const inputLogin = {
    email: "john.doe@outlook.com",
    password: "12345",
  };
  const login = new Login(new UserRepositoryDatabase(connection));
  const outputLogin = await login.execute(inputLogin);
  const getSection = new GetSession();
  const outputGetSection = await getSection.execute({
    token: outputLogin.token,
  });
  expect(outputGetSection.email).toBe(input.email);
  await connection.close();
});
