import * as crypto from "crypto";
export default class UUIDGenerator {
  constructor(readonly value: string) {}
  static create() {
    return crypto.randomUUID();
  }
}
