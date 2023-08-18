import crypto from "crypto";
import Password from "./Password";
export default class Pbkdf2Password implements Password {
  private constructor(readonly value: string, readonly salt: string) {}
  static create(password: string) {
    const salt = crypto.randomBytes(20).toString("hex");
    const value = crypto
      .pbkdf2Sync(password, salt, 100, 64, "sha512")
      .toString("hex");
    return new Pbkdf2Password(value, salt);
  }
  static restore(password: string, salt: string) {
    return new Pbkdf2Password(password, salt);
  }
  validate(password: string): boolean {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 100, 64, "sha512")
      .toString("hex");
    return this.value === hash;
  }
}
