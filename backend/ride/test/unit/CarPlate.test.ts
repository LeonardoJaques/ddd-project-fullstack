import CarPlate from "../../src/domain/driver/CarPlate";

test("Deve testar uma placa válida ", () => {
  const carPlate = new CarPlate("ABC1234");
  expect(carPlate.value).toBe("ABC1234");
});

test("não deve registrar uma placa inválida ", () => {
  expect(() => new CarPlate("ABC12")).toThrowError("Invalid Car Plate");
});
