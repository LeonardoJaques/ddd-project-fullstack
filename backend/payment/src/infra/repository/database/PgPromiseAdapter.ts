import pgPromise from "pg-promise";
import DatabaseConnection from "./DatabaseConnection";
//framework and Drivers
export default class PgPromiseAdapter implements DatabaseConnection {
  private connection: any;
  constructor() {
    this.connection = pgPromise()("postgres://dev:RWhf9kFo@localhost:5432/app");
  }
  async query(statements: string, params: any): Promise<any> {
    return await this.connection.query(statements, params);
  }
  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}
