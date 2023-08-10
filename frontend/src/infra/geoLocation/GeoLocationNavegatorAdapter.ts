import Coord from "../../domain/ride/Coord";
import GeoLocation from "./GeoLocation";

export default class GeoLocationNavegatorAdapter implements GeoLocation {
  async getCoord(): Promise<Coord> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(async function (position: any) {
        resolve(new Coord(position.coords.latitude, position.coords.longitude));
      });
    });
  }
}
