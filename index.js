require('dotenv').config()

const express = require('express')
const http = require('http')
const path = require('path')
const connection = require('./db/connection/connection')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const app = express()
const server = http.createServer(app)

const corsOptions = {
    origin: 'http://127.0.0.1:5500', //dominio permitido 
    methods: 'GET,POST', // Métodos HTTP permitidos
    credentials: true, // Habilita el uso de credenciales (cookies, autenticación)
    optionsSuccessStatus: 204, // Código de respuesta para solicitudes OPTIONS exitosas
}

app.use(cors(corsOptions))

app.set('port', process.env.PORT || 3000)

connection()

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express(JSON))

app.use(session({
    key: process.env.KEY,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 5 * 60 * 1000 }
}))

app.use('/', require('./router'))

app.use(express.static(path.join(__dirname, 'app')))

server.listen(app.get('port'), () => {
    console.log(process.env.PORT)
})