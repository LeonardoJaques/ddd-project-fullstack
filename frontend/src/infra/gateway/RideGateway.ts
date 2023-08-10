import Ride from "../../domain/ride/Ride";

export default interface RideGateway {
  create(ride: Ride): Promise<number>;
  request(ride: Ride): Promise<string>;
}
export type CalculateRideInput = {
  positions: { lat: number; long: number; date: Date }[];
};
export type RequestRideInput = {
  passengerId: string;
  from: {
    lat: number;
    long: number;
  };
  to: {
    lat: number;
    long: number;
  };
  date: Date;
};
