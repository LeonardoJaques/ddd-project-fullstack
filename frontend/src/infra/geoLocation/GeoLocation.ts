import Coord from "../../domain/ride/Coord";
export default interface GeoLocation {
  getCoord(): Promise<Coord>;
}
