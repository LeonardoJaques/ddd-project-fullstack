import Pbkdf2Password from "./Pbkdf2Password";
import PlainPassword from "./PlainPassword";
import Sha1Password from "./Sha1Password";

export default class PasswordFactory {
  static create(passwordType: string) {
    if (passwordType === "plain") return PlainPassword;
    if (passwordType === "sha1") return Sha1Password;
    if (passwordType === "pbkdf2") return Pbkdf2Password;
    throw new Error("Invalid password type");
  }
}
