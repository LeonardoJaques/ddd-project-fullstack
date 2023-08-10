import Passenger from "../../src/domain/passenger/Passenger";

test("Deve criar um passageiro", async function () {
  const passenger = Passenger.create(
    "Jonh Doe",
    "john.doe@gmail.com",
    "87175659520"
  );
  expect(passenger.passengerId).toBeDefined();
  expect(passenger.name).toBe("Jonh Doe");
  expect(passenger.email.value).toBe("john.doe@gmail.com");
  expect(passenger.document.value).toBe("87175659520");
});

test("Deve criar um passageiro com cpf invalido", async function () {
  expect(() =>
    Passenger.create("Jonh Doe", "john.doe@gmail.com", "8717565951")
  ).toThrowError("Invalid cpf");
});

test("Deve criar um passageiro com email", async function () {
  expect(() =>
    Passenger.create("Jonh Doe", "john.doe@gmail", "87175659520")
  ).toThrowError("Invalid email");
});
