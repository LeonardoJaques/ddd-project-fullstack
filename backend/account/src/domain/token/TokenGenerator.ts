import { sign, verify } from "jsonwebtoken";

export default class TokenGenerator {
  constructor(readonly secret: string) {}
  static create(key: string, email: string, date: Date) {
    const expiresIn = 1000000;
    return sign({ email, iat: date.getTime(), expiresIn }, key);
  }
  static verify(key: string, token: string): any {
    return verify(token, key);
  }
}
