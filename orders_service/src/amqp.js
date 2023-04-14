const amqp = require("amqplib");
const pool = require("./config/db");

const createOrder = async (product_id, quantity, amount) => {
  return await pool.query(
    "INSERT INTO orders (product_id, quantity, amount) VALUES (?, ?, ?)",
    [product_id, quantity, amount]
  );
};

const receiveFromRabbitMQ = async (queueName) => {
  try {
    // Connect to the RabbitMQ server
    const connection = await amqp.connect("amqp://localhost");

    // Create a channel to communicate with the server
    const channel = await connection.createChannel();

    // Create the queue if it doesn't already exist
    await channel.assertQueue(queueName);

    // Consume messages from the queue
    channel.consume(queueName, async (data) => {
      try {
        if (data !== null) {
          // Process the message
          const { product_id, quantity, amount } = JSON.parse(data.content);
          console.log("Received payload", product_id, quantity, amount);

          await createOrder(product_id, quantity, amount);

          // Acknowledge that the message has been processed
          channel.ack(data);
        }
      } catch (error) {
        console.log(error);
      }
    });

    console.log("Waiting for payloads from RabbitMQ server");
  } catch (error) {
    console.error("Error receiving payloads from RabbitMQ server:", error);
  }
};

// const connect = async () => {
//   const connection = await amqp.connect("amqp://localhost");
//   const channel = await connection.createChannel();
//   await channel.assertQueue("ORDERS");
// };

module.exports = receiveFromRabbitMQ;
