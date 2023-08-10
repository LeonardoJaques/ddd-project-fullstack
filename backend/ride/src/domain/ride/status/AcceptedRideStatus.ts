import Ride from "../Ride";
import InProgressRideStatus from "./InProgressRideStatus";
import RideStatus from "./RideStatus";

export default class AcceptedRideStatus extends RideStatus {
  values: string;
  constructor(ride: Ride) {
    super(ride);
    this.values = "accepted";
  }
  request(): void {
    throw new Error("Invalid status");
  }
  accept(): void {
    throw new Error("Invalid status");
  }
  start(): void {
    this.ride.status = new InProgressRideStatus(this.ride);
  }
  end(): void {
    throw new Error("Invalid status");
  }
}
