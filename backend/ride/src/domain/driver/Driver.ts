import UUIDGenerator from "../identity/UUIDGenerator";
import CPF from "../person/CPF";
import Email from "../person/Email";
import CarPlate from "./CarPlate";

export default class Driver {
  document: CPF;
  email: Email;
  carPlate: CarPlate;

  constructor(
    readonly driverId: string,
    readonly name: string,
    email: string,
    document: string,
    carPlate: string
  ) {
    this.document = new CPF(document);
    this.email = new Email(email);
    this.carPlate = new CarPlate(carPlate);
  }
  static create(
    name: string,
    email: string,
    document: string,
    carPlate: string
  ) {
    const driverId = UUIDGenerator.create();
    return new Driver(driverId, name, email, document, carPlate);
  }
}
