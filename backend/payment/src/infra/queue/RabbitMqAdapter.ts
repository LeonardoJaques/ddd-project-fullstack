import amqp from "amqplib";
import Queue from "./Queue";

export default class RabbitMqAdapter implements Queue {
  connection: any;
  async connect(): Promise<void> {
    this.connection = await amqp.connect("amqp://dev:senhadev@localhost:5672");
    console.info("Connected to RabbitMQ");
  }
  async consume(queueName: string, callback: Function): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async (message: any) => {
      const input = JSON.parse(message.content.toString());
      try {
        await callback(input);
        channel.ack(message);
      } catch (e: any) {
        console.error(e.message);
      }
    });
  }
  async publish(queueName: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  }
}
