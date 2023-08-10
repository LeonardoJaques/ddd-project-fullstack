export default interface MailGateway {
  send(email: string, message: string): Promise<void>;
}
