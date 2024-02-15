const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    registrationDate: {type: Date, required: true},
    isBanned: {type: Boolean, required: true},
    lastLogin: {type: Date, required: false}
})
const User = mongoose.model('User', userSchema)

module.exports = User