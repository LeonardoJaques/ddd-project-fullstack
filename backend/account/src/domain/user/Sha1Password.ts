import crypto from "crypto";
import Password from "./Password";
export default class Sha1Password implements Password {
  private constructor(readonly value: string, readonly salt: string = "") {}
  static create(password: string) {
    const value = crypto.createHash("sha1").update(password).digest("hex");
    return new Sha1Password(value);
  }
  static restore(password: string) {
    return new Sha1Password(password);
  }

  validate(password: string): boolean {
    const value = crypto.createHash("sha1").update(password).digest("hex");
    return this.value === value;
  }
}
