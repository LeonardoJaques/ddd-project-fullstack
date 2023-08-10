import Ride from "../Ride";
import AcceptedRideStatus from "./AcceptedRideStatus";
import RideStatus from "./RideStatus";

export default class RequestedRideStatus extends RideStatus {
  values: string;
  constructor(ride: Ride) {
    super(ride);
    this.values = "requested";
  }
  request(): void {
    throw new Error("Invalid status");
  }
  accept(): void {
    this.ride.status = new AcceptedRideStatus(this.ride);
  }
  start(): void {
    throw new Error("Invalid status");
  }
  end(): void {
    throw new Error("Invalid status");
  }
}
