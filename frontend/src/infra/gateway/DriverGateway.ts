import Driver from "../../domain/driver/Driver";
export default interface DriverGateway {
  create(driver: Driver): Promise<any>;
}
export type CreateDriverInput = {
  name: string;
  email: string;
  document: string;
  carPlate: string;
};
