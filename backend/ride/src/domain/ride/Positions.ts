import Coord from "../distance/Coord";

export default class Position {
  coord: Coord;
  constructor(
    readonly lat: number,
    readonly long: number,
    readonly date: Date
  ) {
    this.coord = new Coord(lat, long);
  }
}
