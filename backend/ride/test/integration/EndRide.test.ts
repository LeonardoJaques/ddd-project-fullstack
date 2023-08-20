import axios from "axios";
import AcceptRide from "../../src/application/usecase/AcceptRide";
import EndRide from "../../src/application/usecase/EndRide";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import StartRide from "../../src/application/usecase/StartRide";
import RepositoryFactoryDatabase from "../../src/infra/factory/RepositoryFactoryDatabase";
import AccountGatewayHttp from "../../src/infra/gateway/AccountGatewayHttp";
import PaymentGatewayHttp from "../../src/infra/gateway/PaymentGatewayHttp";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter";
import RabbitMqAdapter from "../../src/infra/queue/RabbitMqAdapter";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";
import PgPromiseAdapter from "../../src/infra/repository/database/PgPromiseAdapter";
axios.defaults.validateStatus = () => true;
test("Deve finalizar uma corrida", async function () {
  const inputCreatePassenger = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
  };
  const connection = new PgPromiseAdapter();
  const accountGateway = new AccountGatewayHttp(new AxiosAdapter());
  const outputCreatePassenger = await accountGateway.createPassenger(
    inputCreatePassenger
  );
  const inputRequestRide = {
    passengerId: outputCreatePassenger.passengerId,
    from: {
      lat: -27.584905257808835,
      long: -48.545022195325124,
    },
    to: {
      lat: -27.496887588317275,
      long: -48.522234807851476,
    },
    date: new Date("2021-03-01T10:10:00"),
  };

  const inputCreateDriver = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
    carPlate: "ABC1234",
  };

  const outputCreateDriver = await accountGateway.createDriver(
    inputCreateDriver
  );
  const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
  const outputRequestRide = await requestRide.execute(inputRequestRide);

  const inputAcceptRide = {
    rideId: outputRequestRide.rideId,
    driverId: outputCreateDriver.driverId,
    date: new Date("2021-03-01T10:10:00"),
  };
  const acceptRide = new AcceptRide(new RideRepositoryDatabase(connection));
  await acceptRide.execute(inputAcceptRide);

  const inputStartRide = {
    rideId: outputRequestRide.rideId,
    date: new Date("2021-03-01T10:20:00"),
  };

  const startRide = new StartRide(new RideRepositoryDatabase(connection));
  await startRide.execute(inputStartRide);
  const inputEndtRide = {
    rideId: outputRequestRide.rideId,
    date: new Date("2021-03-01T10:40:00"),
  };
  const queue = new RabbitMqAdapter();
  await queue.connect();
  const endRide = new EndRide(
    new RideRepositoryDatabase(connection),
    new AccountGatewayHttp(new AxiosAdapter()),
    new PaymentGatewayHttp(new AxiosAdapter()),
    queue
  );

  await endRide.execute(inputEndtRide);
  const getRide = new GetRide(new RepositoryFactoryDatabase(connection));
  const outputGetRide = await getRide.execute({
    rideId: outputRequestRide.rideId,
  });
  expect(outputGetRide.rideId).toBeDefined();
  expect(outputGetRide.status).toBe("completed");
  expect(outputGetRide.endDate).toEqual(new Date("2021-03-01T10:40:00"));
  await connection.close();
});
