const mongoose = require('mongoose')

const userInfo = new mongoose.Schema({
    name: String,
    image: String,
    email: String,
    password: String
})

module.exports = mongoose.model('userData', userInfo)