const http = require('http')
const express = require('express')
const session = require('express-session')
const redis = require('redis')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const {createProxyMiddleware} = require('http-proxy-middleware')
const WebSocket = require('websocket') 

const auth = require('./routes/auth')
const call = require('./routes/call')

dotenv.config()

const app = express()
const port = 8000

let redisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
  host: 'redis'
})  

const server = http.createServer(app)
const wss = new WebSocket.server({
  httpServer: server
})   

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: "336565067d7ff0e939b7dfc53323f51e",
  store: new redisStore({client: redisClient}),
  cookie: {}
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/auth', auth.completeAuth)

app.get('/profile', call.profile)
app.get('/log', call.log)

app.post('/event', (req, res)=>{
  res.send('event recieved')
})

app.use('/proxy', createProxyMiddleware({
  target: process.env.FRONTEND_URI,
  changeOrigin: true
}))

app.use('/', createProxyMiddleware({
  target: process.env.FRONTEND_URI,
  changeOrigin: true
}))

app.use('/zoom/api', (req, res, next) => {
  //TODO: Implement API proxy
  next()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})