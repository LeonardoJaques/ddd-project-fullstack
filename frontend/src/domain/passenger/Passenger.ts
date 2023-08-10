import CPF from "../CPF";
import Email from "../Email";
import Name from "../Name";

export default class Passenger {
  passengerId: string;
  name: Name;
  email: Email;
  document: CPF;
  constructor(
    passengerId: string,
    name: string,
    email: string,
    document: string
  ) {
    this.passengerId = passengerId;
    this.name = new Name(name);
    this.email = new Email(email);
    this.document = new CPF(document);
  }

  static create(builder: PassengerBuilder) {
    return new Passenger(
      builder.passengerId,
      builder.name,
      builder.email,
      builder.document
    );
  }
}

export class PassengerBuilder {
  passengerId = "";
  name = "";
  email = "";
  document = "";
  build() {
    return Passenger.create(this);
  }
}
