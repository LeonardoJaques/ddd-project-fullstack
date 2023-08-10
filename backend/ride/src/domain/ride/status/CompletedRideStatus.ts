import Ride from "../Ride";
import RideStatus from "./RideStatus";

export default class CompletedRideStatus extends RideStatus {
  values: string;
  constructor(ride: Ride) {
    super(ride);
    this.values = "completed";
  }
  request(): void {
    throw new Error("Invalid status");
  }
  accept(): void {
    throw new Error("Invalid status");
  }
  start(): void {
    throw new Error("Invalid status");
  }
  end(): void {
    throw new Error("Invalid status");
  }
}
