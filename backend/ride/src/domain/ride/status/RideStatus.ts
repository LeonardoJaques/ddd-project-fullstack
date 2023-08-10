import Ride from "../Ride";

export default abstract class RideStatus {
  abstract values: string;
  constructor(readonly ride: Ride) {}
  abstract request(): void;
  abstract accept(): void;
  abstract start(): void;
  abstract end(): void;
}
