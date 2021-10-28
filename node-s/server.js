const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World mofocker!')
})

app.get('/teste', (req, res) => {
  res.send('ta doidao na maionese?')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})