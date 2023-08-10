import Driver from "../../src/domain/driver/Driver";

test("Não deve criar um motorista com o nome inválido ", () => {
  expect(() => new Driver("", "Jonh", "", "", "")).toThrow(
    new Error("Invalid name")
  );
});
test("Não deve criar um motorista com o email inválido ", () => {
  expect(() => new Driver("", "Jonh Doe", "jonh@outlook", "", "")).toThrow(
    new Error("Invalid email")
  );
});
test("Não deve criar um motorista com o documento inválido ", () => {
  expect(
    () => new Driver("", "Jonh Doe", "Jonh@outlook.com", "83432616075", "")
  ).toThrow(new Error("Invalid cpf"));
});
test("Não deve criar um motorista com a placa do carro inválida ", () => {
  expect(
    () =>
      new Driver("", "Jonh Doe", "Jonh@outlook.com", "83432616074", "AAA999")
  ).toThrow(new Error("Invalid Car Plate"));
});
