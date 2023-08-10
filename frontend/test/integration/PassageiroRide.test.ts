import { mount } from "@vue/test-utils";
import Coord from "../../src/domain/ride/Coord";
import PassengerGatewayHttp from "../../src/infra/gateway/PassengerGatewayHttp";
import RideGatewayHttp from "../../src/infra/gateway/RideGatewayHttp";
import GeoLocation from "../../src/infra/geoLocation/GeoLocation";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter";
import CreatePassenger from "../../src/view/CreatePassenger.vue";
import PassengerRide from "../../src/view/PassengerRide.vue";

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), time));
}
test("O passageiro deve calcular o preço de uma corrida ", async () => {
  const geoLocation: GeoLocation = {
    async getCoord(): Promise<Coord> {
      return new Coord(-27.584905257808835, -48.545022195325124);
    },
  };
  const wrapper = mount(PassengerRide, {
    global: {
      provide: {
        rideGateway: new RideGatewayHttp(new AxiosAdapter()),
        geoLocation,
      },
    },
  });
  await wrapper.get(".ride-from-lat").setValue("-27.584905257808835");
  await wrapper.get(".ride-from-long").setValue("-48.545022195325124");
  await wrapper.get(".ride-to-lat").setValue("-27.496887588317275");
  await wrapper.get(".ride-to-long").setValue("-48.522234807851476");
  await wrapper.get(".calculate-ride-button").trigger("click");
  await sleep(200);
  expect(wrapper.get(".ride-price").text()).toBe("21");
});

test("O passageiro deve solicitar uma corrida ", async () => {
  const wrapperCreatePassenger = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter()),
      },
    },
  });
  await wrapperCreatePassenger.get(".passenger-name").setValue("Jonh Doe");
  await wrapperCreatePassenger
    .get(".passenger-email")
    .setValue("john.doe@outlook.com");
  await wrapperCreatePassenger
    .get(".passenger-documents")
    .setValue("83432616074");
  await wrapperCreatePassenger.get(".passenger-submit").trigger("click");
  await sleep(200);
  const passengerid = wrapperCreatePassenger.get(".passenger-id").text();
  const geoLocation: GeoLocation = {
    async getCoord(): Promise<Coord> {
      return new Coord(-27.584905257808835, -48.545022195325124);
    },
  };
  const wrapperPassengerRide = mount(PassengerRide, {
    global: {
      provide: {
        rideGateway: new RideGatewayHttp(new AxiosAdapter()),
        geoLocation,
      },
    },
  });
  await wrapperPassengerRide.get(".ride-passenger-id").setValue(passengerid);
  await wrapperPassengerRide
    .get(".ride-from-lat")
    .setValue("-27.584905257808835");
  await wrapperPassengerRide
    .get(".ride-from-long")
    .setValue("-48.545022195325124");
  await wrapperPassengerRide
    .get(".ride-to-lat")
    .setValue("-27.496887588317275");
  await wrapperPassengerRide
    .get(".ride-to-long")
    .setValue("-48.522234807851476");
  await wrapperPassengerRide.get(".calculate-ride-button").trigger("click");
  await sleep(200);
  await wrapperPassengerRide.get(".request-ride-button").trigger("click");
  await sleep(200);
  expect(wrapperPassengerRide.get(".ride-id").text()).toHaveLength(36);
});
