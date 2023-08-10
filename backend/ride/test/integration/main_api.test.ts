import axios from "axios";
axios.defaults.validateStatus = () => true;

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
  //given
  const input = {
    positions: [
      {
        lat: -27.584905257808835,
        long: -48.545022195325124,
        date: new Date("2021-03-01T10:00:00"),
      },
      {
        lat: -27.496887588317275,
        long: -48.522234807851476,
        date: new Date("2021-03-01T10:00:00"),
      },
    ],
  };
  // //when
  const response = await axios.post(
    "http://localhost:3000/calculate_ride",
    input
  );
  //then
  const output = response.data;
  expect(output.price).toBe(21);
});
test("Se a data for invalida deve lancar erro", async function () {
  //given
  const input = {
    positions: [
      {
        lat: -27.584905257808835,
        long: -48.545022195325124,
        date: "javascript",
      },
      {
        lat: -27.496887588317275,
        long: -48.522234807851476,
        date: "javascript",
      },
    ],
  };
  // //when
  const response = await axios.post(
    "http://localhost:3000/calculate_ride",
    input
  );
  //then
  const output = response.data;
  expect(output).toBe("Invalid date");
});
test("Deve cadastrar o passageiro", async function () {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
  };
  const response = await axios.post("http://localhost:3000/passengers", input);
  const output = response.data;
  expect(output.passengerId).toBeDefined();
});

test("Não deve cadastrar o passageiro com cpf inválido", async function () {
  const input = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659526",
  };

  const response = await axios.post("http://localhost:3000/passengers/", input);
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
    "http://localhost:3000/passengers/",
    input
  );
  const output1 = response1.data;
  const response2 = await axios.get(
    `http://localhost:3000/passengers/${output1.passengerId}`
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
  const response = await axios.post("http://localhost:3000/drivers", input);
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

  const response = await axios.post("http://localhost:3000/drivers/", input);
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
  const response = await axios.post("http://localhost:3000/drivers", input);
  const output = response.data;
  const response2 = await axios.get(
    `http://localhost:3000/drivers/${output.driverId}`
  );
  const output2 = response2.data;
  expect(output2.name).toBe(input.name);
  expect(output2.email).toBe(input.email);
  expect(output2.document).toBe(input.document);
  expect(output2.carPlate).toBe(input.carPlate);
});
