import UUIDGenerator from "../identity/UUIDGenerator";
import CPF from "../person/CPF";
import Email from "../person/Email";
export default class Passenger {
  document: CPF;
  email: Email;

  constructor(
    readonly passengerId: string,
    readonly name: string,
    email: string,
    document: string
  ) {
    this.document = new CPF(document);
    this.email = new Email(email);
  }
  static create(name: string, email: string, document: string) {
    const passengerId = UUIDGenerator.create();
    return new Passenger(passengerId, name, email, document);
  }
}
