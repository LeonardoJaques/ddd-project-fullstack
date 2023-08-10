import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import RepositoryFactoryDatabase from "../../src/infra/factory/RepositoryFactoryDatabase";
import PassengerRepositoryDatabase from "../../src/infra/repository/PassengerRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";
import PgPromiseAdapter from "../../src/infra/repository/database/PgPromiseAdapter";

test("Deve solicitar uma corrida", async () => {
  const connection = new PgPromiseAdapter();
  const inputCreatePassenger = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
  };
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
    date: new Date("2021-03-01T10:00:00"),
  };
  const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
  const outputRequestRide = await requestRide.execute(inputRequestRide);
  expect(outputRequestRide.rideId).toBeDefined();
  await connection.close();
});
test("Deve obter uma corrida", async () => {
  const connection = new PgPromiseAdapter();
  const inputCreatePassenger = {
    name: "Jonh Doe",
    email: "john.doe@outlook.com",
    document: "87175659520",
  };
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
    date: new Date("2021-03-01T10:00:00"),
  };
  const requestRide = new RequestRide(new RideRepositoryDatabase(connection));
  const outputRequestRide = await requestRide.execute(inputRequestRide);
  const getRide = new GetRide(new RepositoryFactoryDatabase(connection));
  const outputGetRide = await getRide.execute({
    rideId: outputRequestRide.rideId,
  });

  expect(outputRequestRide.rideId).toBeDefined();
  expect(outputGetRide.status).toBe("requested");
  expect(outputGetRide.requestDate).toEqual(new Date("2021-03-01T10:00:00"));
  await connection.close();
});
