import Driver from "../../src/domain/driver/Driver";

test("Deve criar um motorista", async function () {
  const driver = Driver.create(
    "Jonh Doe",
    "john.doe@gmail.com",
    "87175659520",
    "ABC1234"
  );
  expect(driver.driverId).toBeDefined();
  expect(driver.name).toBe("Jonh Doe");
  expect(driver.email.value).toBe("john.doe@gmail.com");
  expect(driver.document.value).toBe("87175659520");
  expect(driver.carPlate.value).toBe("ABC1234");
});

test("Não deve criar um motorista com cpf invalido", async function () {
  expect(() =>
    Driver.create("Jonh Doe", "john.doe@gmail.com", "8717565951", "ABC1234")
  ).toThrowError("Invalid cpf");
});

test("Não deve criar um motorista com email inválido", async function () {
  expect(() =>
    Driver.create("Jonh Doe", "john.doe@gmail", "87175659520", "ABC1234")
  ).toThrowError("Invalid email");
});

test("Não deve criar um motorista com placa do carro inválida", async function () {
  expect(() =>
    Driver.create("Jonh Doe", "john.doe@gmail.com", "87175659520", "ABC123")
  ).toThrowError("Invalid Car Plate");
});
