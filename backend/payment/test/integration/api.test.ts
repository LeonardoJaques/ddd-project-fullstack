import axios from "axios";
axios.defaults.validateStatus = () => true;
test("Deve processar um pagamento", async () => {
  const input = {
    name: "Jonh Doe",
    email: "jonh.doe@gmail.com",
    amount: 30,
  };
  const responseProcess = await axios.post(
    "http://localhost:3001/process_payment",
    input
  );
  const processPaymentOutput = responseProcess.data;

  const responseTransaction = await axios.get(
    `http://localhost:3001/transactions/${processPaymentOutput.transactionId}`
  );
  const getTransactionOutput = responseTransaction.data;
  expect(getTransactionOutput.name).toBe(input.name);
});
