import AcceptRide from "../../src/application/usecase/AcceptRide";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import StartRide from "../../src/application/usecase/StartRide";
import RepositoryFactoryDatabase from "../../src/infra/factory/RepositoryFactoryDatabase";
import DriverRepositoryDatabase from "../../src/infra/repository/DriverRepositoryDatabase";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";
import PgPromiseAdapter from "../../src/infra/repository/database/PgPromiseAdapter";

test("Deve iniciar uma corrida", async function () {
  const inputCreatePassenger = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "83432616074",
  };
  const connection = new PgPromiseAdapter();
  const createPassenger = new CreatePassenger(
    new PassengerRepositoryDatabase(connection)
  );
  const outputCreatePassenger = await createPassenger.execute(
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
  const createDriver = new CreateDriver(
    new DriverRepositoryDatabase(connection)
  );
  const outputCreateDriver = await createDriver.execute(inputCreateDriver);
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

  const getRide = new GetRide(new RepositoryFactoryDatabase(connection));
  const outputGetRide = await getRide.execute({
    rideId: outputRequestRide.rideId,
  });
  expect(outputGetRide.rideId).toBeDefined();
  expect(outputGetRide.status).toBe("in_progress");
  expect(outputGetRide.startDate).toEqual(new Date("2021-03-01T10:20:00"));
  await connection.close();
});
