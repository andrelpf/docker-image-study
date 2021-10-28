const express = require('express');
const Queue = require('../Models/Queue');

class QueueController {

    /**
     * Método para criar mensagem
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    static async criarMensagem(req, res, next) {
        try {
            // Criação de objeto queue
            const queue = new Queue();
            // Recuperação do body
            const body = req.body;
            // Criar conexao da queue
            await queue.criarConexao();
            // Envio do body para a fila
            await queue.enviarMensagem('default', body);
            // Response
            res.status(200).send({ sucess: true, message: 'Mensagem enviada a fila' });
        } catch (error) {
            // Response Error
            res.status(500).send({ message: error.message, stack: error.stack });
        }
    }

    /**
     * Método para consumir mensagens
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    static async consumirMensagens(req, res, next) {
        try {
            // Criação de objeto queue
            const queue = new Queue();
            // Recuperação do body
            const body = req.body;
            // Criar conexao da queue
            await queue.criarConexao();
            // Envio do body para a fila
            await queue.consumirMensagem(body.queue);
            // Response
            res.status(200).send({ sucess: true, message: 'Leitura em andamento' });
        } catch (error) {
            // Response Error
            res.status(500).send({ message: error.message, stack: error.stack });
        }
    }
}
module.exports = QueueController;