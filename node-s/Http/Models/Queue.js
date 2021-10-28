// const amqp = require('amqplib');
const amqp = require('amqplib');
const amqp_cb = require('amqplib/callback_api');
class Queue {
    /** @type {amqp.Connection} */
    connection;
    /** @type {amqp.Channel} */
    channel;
    /** @type {string} */
    queue;
    /** @type {any} */
    message;

    // Definição do constructor
    constructor() { }

    async criarConexao() {
        // Abrindo a conexão
        this.connection = await amqp.connect(process.env.FILA_ENDPOINT);
    }
    /**
     * Método para realizar o envio da mensagem
     * @param {string} queue
     * @param {any} message
     */
    async enviarMensagem(queue, message) {
        // Definição de variável
        this.queue = queue;
        this.message = JSON.stringify(message);
        // Procedimentos AMQP
        await this.criarCanal();
        await this.enfileirar();
    }

    /**
     * Cria um canal de comunicação AMQP
     */
    async criarCanal() {
        this.channel = await this.connection.createChannel();
    }

    /**
     * Insere a mensagem na fila definida
     */
    async enfileirar() {
        // Canal na fila x
        await this.channel.assertQueue(this.queue, {
            durable: false
        });
        // Envio para fila
        this.channel.sendToQueue(this.queue, Buffer.from(this.message));
        // Mensagem enviada
        console.log(" [x] Sent %s", this.message);
    }

}
module.exports = Queue;