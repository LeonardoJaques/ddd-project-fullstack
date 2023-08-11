import axios from "axios";
axios.defaults.validateStatus = () => true;

test("Deve cadastrar o passageiro", async function () {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
  };
  const response = await axios.post("http://localhost:3002/passengers", input);
  const output = response.data;
  expect(output.passengerId).toBeDefined();
});

test("Não deve cadastrar o passageiro com cpf inválido", async function () {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659526",
  };

  const response = await axios.post("http://localhost:3002/passengers/", input);
  expect(response.status).toBe(422);
  expect(response.data).toBe("Invalid cpf");
});

test("Deve obter o passageiro", async function () {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
  };
  const response1 = await axios.post(
    "http://localhost:3002/passengers/",
    input
  );
  const output1 = response1.data;
  const response2 = await axios.get(
    `http://localhost:3002/passengers/${output1.passengerId}`
  );

  const output2 = response2.data;
  expect(output2.name).toBe(input.name);
  expect(output2.email).toBe(input.email);
  expect(output2.document).toBe(input.document);
});
test("Deve cadastrar o motorista", async function () {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
    carPlate: "ABC1234",
  };
  const response = await axios.post("http://localhost:3002/drivers", input);
  const output = response.data;
  expect(output.driverId).toBeDefined();
});
test("Não deve cadastrar o passageiro com cpf inválido", async function () {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659521",
    carPlate: "ABC1234",
  };

  const response = await axios.post("http://localhost:3002/drivers/", input);
  expect(response.status).toBe(422);
  expect(response.data).toBe("Invalid cpf");
});

test("Deve obter o motorista", async function () {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
    carPlate: "ABC1234",
  };
  const response = await axios.post("http://localhost:3002/drivers", input);
  const output = response.data;
  const response2 = await axios.get(
    `http://localhost:3002/drivers/${output.driverId}`
  );
  const output2 = response2.data;
  expect(output2.name).toBe(input.name);
  expect(output2.email).toBe(input.email);
  expect(output2.document).toBe(input.document);
  expect(output2.carPlate).toBe(input.carPlate);
});
