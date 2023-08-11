import axios from "axios";
axios.defaults.validateStatus = () => true;

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function () {
  //given
  const input = {
    positions: [
      {
        lat: -27.584905257808835,
        long: -48.545022195325124,
        date: new Date("2021-03-01T10:00:00"),
      },
      {
        lat: -27.496887588317275,
        long: -48.522234807851476,
        date: new Date("2021-03-01T10:00:00"),
      },
    ],
  };
  // //when
  const response = await axios.post(
    "http://localhost:3000/calculate_ride",
    input
  );
  //then
  const output = response.data;
  expect(output.price).toBe(21);
});
test("Se a data for invalida deve lancar erro", async function () {
  //given
  const input = {
    positions: [
      {
        lat: -27.584905257808835,
        long: -48.545022195325124,
        date: "javascript",
      },
      {
        lat: -27.496887588317275,
        long: -48.522234807851476,
        date: "javascript",
      },
    ],
  };
  // //when
  const response = await axios.post(
    "http://localhost:3000/calculate_ride",
    input
  );
  //then
  const output = response.data;
  expect(output).toBe("Invalid date");
});
