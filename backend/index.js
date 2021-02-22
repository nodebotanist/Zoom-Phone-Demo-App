const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const authRoutes = require('./src/routes/auth')

dotenv.config()

const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/auth', authRoutes.completeAuth)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})