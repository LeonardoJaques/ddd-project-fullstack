import Coord from "./Coord";

export class DistanceCalculator {
  // make a distance calculation
  static calculate(from: Coord, to: Coord) {
    const earthRadius = 6371;
    const degreesToRadians = Math.PI / 180;
    const deltaLatitude = (to.lat - from.lat) * degreesToRadians;
    const deltaLongitude = (to.long - from.long) * degreesToRadians;
    // a is the square of half the chord length between the points
    const haversinePart =
      Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
      Math.cos(from.lat * degreesToRadians) *
        Math.cos(to.lat * degreesToRadians) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2);
    // c is the angular distance in radians
    const centralAngle =
      2 * Math.atan2(Math.sqrt(haversinePart), Math.sqrt(1 - haversinePart));
    const distance = earthRadius * centralAngle;
    return Math.round(distance);
  }
}
