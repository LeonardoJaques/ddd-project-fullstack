import CPF from "../CPF";
import CarPlate from "../CarPlate";
import Email from "../Email";
import Name from "../Name";

export default class Driver {
  driverId: string;
  name: Name;
  email: Email;
  document: CPF;
  carPlate: CarPlate;
  constructor(
    driverId: string,
    name: string,
    email: string,
    document: string,
    carPlate: string
  ) {
    this.driverId = driverId;
    this.name = new Name(name);
    this.email = new Email(email);
    this.document = new CPF(document);
    this.carPlate = new CarPlate(carPlate);
  }

  static create(builder: DriverBuilder) {
    return new Driver(
      builder.driverId,
      builder.name,
      builder.email,
      builder.document,
      builder.carPlate
    );
  }
}

export class DriverBuilder {
  driverId = "";
  name = "";
  email = "";
  document = "";
  carPlate = "";
  build() {
    return Driver.create(this);
  }
}
