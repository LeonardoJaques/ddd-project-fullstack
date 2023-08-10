import Email from "../../src/domain/person/Email";

test("Deve validiar o email ", function () {
  const email = "john.doe@gmail.com";
  const isValid = new Email(email);
  expect(isValid).toBeTruthy();
});

// Na deve validar um email invalido e retornar false
test("Não deve validiar o email ", function () {
  const email = "john.doe@gmail";
  expect(() => new Email(email)).toThrowError("Invalid email");
});
