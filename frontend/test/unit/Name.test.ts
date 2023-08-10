import Name from "../../src/domain/Name";

test("Deve criar um nome válido", () => {
  const name = new Name("John Doe");
  expect(name.getValue()).toBe("John Doe");
});
test("Não deve criar um nome válido", () => {
  expect(() => new Name("John")).toThrow(new Error("Invalid name"));
});
