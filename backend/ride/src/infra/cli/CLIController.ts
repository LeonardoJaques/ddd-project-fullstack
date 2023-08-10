import CreatePassenger from "../../application/usecase/CreatePassenger";
import InputOutput from "./inputOutput";

export default class CLIController {
  constructor(inputOutput: InputOutput, createPassenger: CreatePassenger) {
    inputOutput.on("create-passenger", async (params: any) => {
      try {
        const [name, email, document] = params.split(" ");
        const output = await createPassenger.execute({ name, email, document });
        inputOutput.write(JSON.stringify(output.passengerId));
      } catch (error: any) {
        inputOutput.write(error.message);
      }
    });
  }
}
