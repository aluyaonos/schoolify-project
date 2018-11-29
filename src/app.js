const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//requires database connection so the request can be added to the database
const mongodb_connection = require('../config/config')
var db = mongodb_connection.connect();

//HTTP REQUESTS & Routes
require('./routes')(app)

//Serve static apps if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('Project/dist'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'Project', 'dist', 'index.html'))
    })

}

//Port Node Server is running on
app.listen(process.env.PORT || 8081)