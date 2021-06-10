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
    movieList: [{id: String, title: String}],
    seriesList: [{id: String, title: String}],
      
})

let UserModel = model('user', UserSchema)

module.exports = UserModel