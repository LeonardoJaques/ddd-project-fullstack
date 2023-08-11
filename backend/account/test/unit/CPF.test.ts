import CPF from "../../src/domain/person/CPF";

test.each(["678.000.727-70", "74587887803", "87175659520"])(
  "Deve testar cpfs validos",
  (value: string) => {
    const cpf = new CPF(value);
    expect(cpf.value).toBe(value);
  }
);

test.each(["83432516976", "99999999999", "8343236160", ""])(
  "Deve testar cpfs validos",
  (value: string) => {
    expect(() => new CPF(value)).toThrowError("Invalid cpf");
  }
);
