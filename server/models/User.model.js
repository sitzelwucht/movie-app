const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

let UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    watchlist: [{id: String, title: String}]
      
})

let UserModel = model('user', UserSchema)

module.exports = UserModel