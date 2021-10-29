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
        // await this.fecharConexao();
    }

    /**
     * Consumir Mensagem
     */
    async consumirMensagem(queue) {
        // Seta a fila como uma propriedade
        this.queue = queue;
        // Cria o canal de comunicação
        await this.criarCanal();
        // Log de mensagens dentro da queue
        console.log(" [*] Aguardando por mensagens em %s.", this.queue);
        // Consumo de mensagem
        await this.consumir();
        await this.fecharConexao();
    }

    /** Método para consumir as mensagens no canal */
    async consumir() {
        console.log(' [*] Inicio de consumo');
        await this.channel.consume(this.queue, (msg) => {
            if (msg !== null) {
                this.logMessage(msg);
                this.channel.ack(msg);
            }
        }, { noAck: true });
    }

    /**
     * Logar mensagem lida
     */
    logMessage(msg) {
        console.log(' [x] Nova mensagem: %s ', msg.content.toString());
    }

    /**
     * Cria um canal de comunicação AMQP para produzir mensagens
     */
    async criarCanal() {
        this.channel = await this.connection.createChannel();
        // Canal na fila x
        await this.channel.assertQueue(this.queue);
    }

    /**
     * Insere a mensagem na fila definida
     */
    async enfileirar() {
        // Envio para fila
        this.channel.sendToQueue(this.queue, Buffer.from(this.message));
        // Mensagem enviada
        console.log(" [x] Enviada %s", this.message);
    }

    async fecharConexao() {
        await this.connection.close();
    }
}
module.exports = Queue;