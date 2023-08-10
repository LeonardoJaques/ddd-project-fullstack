import Passenger from "../../src/domain/passenger/Passenger";

test("Não deve criar um passageiro com o nome inválido ", () => {
  expect(() => new Passenger("", "Jonh", "", "")).toThrow(
    new Error("Invalid name")
  );
});
test("Não deve criar um passageiro com o email inválido ", () => {
  expect(() => new Passenger("", "Jonh Doe", "jonh@outlook", "")).toThrow(
    new Error("Invalid email")
  );
});
test("Não deve criar um passageiro com o documento inválido ", () => {
  expect(
    () => new Passenger("", "Jonh Doe", "Jonh@outlook.com", "83432616075")
  ).toThrow(new Error("Invalid cpf"));
});
