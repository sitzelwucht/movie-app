const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/movieapp'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(result => console.log(`connected to db: ${result.connections[0].name}`))
.catch(err => console.log('Error while connecting to db', err))