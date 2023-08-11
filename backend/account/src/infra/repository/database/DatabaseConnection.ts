// ISP - Interface Segregation Principle, da camada de interface adpters
export default interface DatabaseConnection {
  query(statements: string, params: any): Promise<any>;
  close(): Promise<void>;
}
