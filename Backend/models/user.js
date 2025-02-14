const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    phonenumber: {
        type: Number,
        required: true,
        min: 10
    },
},{timelapsed:true});

module.exports = mongoose.model('User', userSchema);