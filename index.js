import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'

const app = express()
const port = 8081

const jsonParser = bodyParser.json()
const xmlParser = bodyParser.text({ type: 'application/xml' })

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/rest', jsonParser, (req, res) => {
  const destinyUrl = req.get('Destiny-Url')
  console.log('JSON Params', req.body)
  fetch(destinyUrl)
    .then((response) => response.json())
    .then((data) => {
      res.send(data)
    })
})

app.post('/soap', xmlParser, (req, res) => {
  console.log('Received XML', req.body)
  const requestBody = req.body
  const destinyUrl = req.get('Destiny-Url')
  const soapAction = req.get('SOAPAction')
  const headers = {
    'Content-Type': 'application/xml',
    'SOAPAction': soapAction
  }
  fetch(destinyUrl, { headers, method: 'POST', body: requestBody })
    .then((response) => response.text())
    .then((data) => {
      res.set('Content-Type', 'application/xml')
      res.send(data)
    })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
