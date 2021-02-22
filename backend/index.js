const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const auth = require('./routes/auth')

dotenv.config()

const app = express()
const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: "336565067d7ff0e939b7dfc53323f51e",
  cookie: {},
  maxAge: 60000
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/auth', auth.completeAuth)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})