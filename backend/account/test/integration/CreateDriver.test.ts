import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";
import PgPromiseAdapter from "../../src/infra/repository/database/PgPromiseAdapter";

//narrow integration test
test("Deve cadastrar o motorista", async function () {
  const connection = new PgPromiseAdapter();
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
    carPlate: "ABC1234",
  };
  const usecase = new CreateDriver(new DriverRepositoryDatabase(connection));
  const output = await usecase.execute(input);
  expect(output.driverId).toBeDefined();
  await connection.close();
});

//broad integration test
test("Deve obter o motorista", async function () {
  const connection = new PgPromiseAdapter();
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
    carPlate: "ABC1234",
  };

  const usecase1 = new CreateDriver(new DriverRepositoryDatabase(connection));
  const output1 = await usecase1.execute(input);
  const usecase2 = new GetDriver(new DriverRepositoryDatabase(connection));
  const output2 = await usecase2.execute({ driverId: output1.driverId });
  expect(output2.name).toBe(input.name);
  expect(output2.email).toBe(input.email);
  expect(output2.document).toBe(input.document);
  expect(output2.carPlate).toBe(input.carPlate);
  await connection.close();
});
