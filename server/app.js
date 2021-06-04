require('dotenv/config')
require('./db')

const express = require('express')
const app = express()

require('./config')(app)

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))


const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*60*24
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/movieapp'
    })
}))

const allRoutes = require('./routes')
app.use('/api', allRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes)


module.exports = app