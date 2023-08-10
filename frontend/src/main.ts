import { createApp } from "vue";
import App from "./App.vue";
import DriverGatewayHttp from "./infra/gateway/DriverGatewayHttp";
import PassengerGatewayHttp from "./infra/gateway/PassengerGatewayHttp";
import AxiosAdapter from "./infra/http/AxiosAdapter";
// import FetchAdapter from "./infra/http/FetchAdapter";
import GeoLocationNavegatorAdapter from "./infra/geoLocation/GeoLocationNavegatorAdapter";
import "./style.css";

const app = createApp(App);
// const httpClient = new FetchAdapter();
const httpClient = new AxiosAdapter();
app.provide("passengerGateway", new PassengerGatewayHttp(httpClient));
app.provide("driverGateway", new DriverGatewayHttp(httpClient));
app.provide("geoLocation", new GeoLocationNavegatorAdapter());
app.mount("#app");
