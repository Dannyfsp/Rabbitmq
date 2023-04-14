const amqp = require("amqplib");

async function sendToRabbitMQ(queueName, payload) {
  try {
    // Connect to the RabbitMQ server
    const connection = await amqp.connect("amqp://localhost");

    // Create a channel to communicate with the server
    const channel = await connection.createChannel();

    // Create the queue if it doesn't already exist
    await channel.assertQueue(queueName);

    // Send the payload to the queue
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));

    console.log("Payload sent to RabbitMQ server");
  } catch (error) {
    console.error("Error sending payload to RabbitMQ server:", error);
  }
}

module.exports = sendToRabbitMQ;
