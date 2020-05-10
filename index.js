import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 8081

const jsonParser = bodyParser.json()
const xmlParser = bodyParser.text({ type: 'application/xml' })

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/rest', jsonParser, (req, res) => {
  console.log('JSON Params', req.body)
  res.send({ params: req.body })
})

app.post('/soap', xmlParser, (req, res) => {
  console.log('Received XML', req.body)
  res.set('Content-Type', 'application/xml')
  res.send(req.body)
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
