const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const user = require('./router/user')


app.use(bodyParser.json())
app.use(cookieParser());

var corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.use('/user', user)

app.get('/', function (req, res) {
    res.send('Default request')
})

app.listen(3003)