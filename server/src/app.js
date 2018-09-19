const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//requires database connection so the request can be added to the database
const mongodb_connection = require('../config/config')
var db = mongodb_connection.connect();

//HTTP REQUESTS & Routes
require('./routes')(app)


//Port Node Server is running on
app.listen(process.env.PORT || 8081)