import UUIDGenerator from "../../src/domain/identity/UUIDGenerator";
import User from "../../src/domain/user/User";
test("Deve criar um novo usuário com senha plain", () => {
  const user = User.create("John.doe@gmail.com", "123456", "plain");
  expect(user.userId).toBeDefined();
  expect(user.email.value).toBe("John.doe@gmail.com");
  expect(user.password.value).toBe("123456");
});
test("Deve restaurar um usuário existente", function () {
  const userId = UUIDGenerator.create();
  // const salt = "75b9a6dc2e43a8cdb76f34b2c32bcd8c31e5d3f1";
  const user = User.restore(
    userId,
    "john.doe@pitlook.com",
    "123456",
    "",
    "plain"
  );
  expect(user.userId).toBe(userId);
  expect(user.email.value).toBe("john.doe@pitlook.com");
  expect(user.password.value).toBe("123456");
});
test("Deve criar um novo usuário com senha encripitada", () => {
  const user = User.create("john.doe@gmail.com", "123456", "sha1");
  expect(user.userId).toBeDefined();
  expect(user.email.value).toBe("john.doe@gmail.com");
  expect(user.password.value).toBe("7c4a8d09ca3762af61e59520943dc26494f8941b");
});
test("Deve validar um usuário existente com senha plain", function () {
  const userId = UUIDGenerator.create();
  const user = User.restore(
    userId,
    "john.doe@gmail.com",
    "123456",
    "",
    "plain"
  );
  expect(user.validatePassword("123456")).toBe(true);
});
test("Deve validar um usuário existente com senha encriptada", function () {
  const userId = UUIDGenerator.create();
  const user = User.restore(
    userId,
    "john.doe@gmail.com",
    "7c4a8d09ca3762af61e59520943dc26494f8941b",
    "",
    "sha1"
  );
  expect(user.validatePassword("123456")).toBe(true);
});
test("Deve criar um novo usuário com senha encripitada com pbkdf2", () => {
  const user = User.create("john.doe@gmail.com", "123456", "pbkdf2");
  expect(user.userId).toBeDefined();
  expect(user.email.value).toBe("john.doe@gmail.com");
  expect(user.password.value).toBeDefined();
});
test("Deve validar um existente usuário com senha encripitada com pbkdf2", () => {
  const salt = "75b9a6dc2e43a8cdb76f34b2c32bcd8c31e5d3f1";
  const password =
    "b94b6fcd7556e8e168cdf543ea5f85d311ad6275cf7509fa2723983d0c89ede1b4a12c7d62b168a93cee14b6469288a3435eec5241b75b10b47d03b6e10ae01b";
  const userId = UUIDGenerator.create();
  const user = User.restore(
    userId,
    "john.doe@gmail.com",
    password,
    salt,
    "pbkdf2"
  );
  expect(user.validatePassword("123456")).toBe(true);
});
