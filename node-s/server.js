// Configurações iniciais express
const express = require('express');
const app = express();
const port = 3000;
// Controllers
const QueueController = require('./Http/Controllers/QueueController');
// Coletor do .env
const dotenv = require('dotenv');
// inicio
dotenv.config();

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Router
app.get('/', (req, res) => {
  res.send('Hello World mofocker!')
})

app.get('/teste', (req, res) => {
  res.send('ta doidao na maionese?')
});

app.post('/criar-mensagem', (req, res, next) => QueueController.criarMensagem(req, res, next));

app.listen(port, () => {
  console.log(`Node Rabbit MQ http://localhost:${port}`)
});