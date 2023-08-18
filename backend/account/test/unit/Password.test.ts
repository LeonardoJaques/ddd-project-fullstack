import PlainPassword from "../../src/domain/user/PlainPassword";
import Sha1Password from "../../src/domain/user/Sha1Password";

test("Deve criar um password plain", () => {
  const password = PlainPassword.create("123456");
  expect(password.validate("123456")).toBe(true);
});
test("Deve criar um password sha1", () => {
  const password = Sha1Password.create("123456");
  expect(password.validate("123456")).toBe(true);
});
