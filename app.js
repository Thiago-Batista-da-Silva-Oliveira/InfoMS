import amqp from 'amqplib'
import { rabbitMQ } from './config.js'

const consumeMessages = async () => {
const connection = await amqp.connect(rabbitMQ.url)

const channel = await connection.createChannel()

await channel.assertExchange(rabbitMQ.exchangeName, "direct")

const q = await channel.assertQueue("InfoQueue")

await channel.bindQueue(q.queue, rabbitMQ.exchangeName, "info")

channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content)

    console.log(data)
    channel.ack(msg)
})

}

consumeMessages()