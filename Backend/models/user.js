const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phonenumber: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    profilePic: {
        type: String,
        default: 'https://www.w3schools.com/howto/img_avatar.png'
    },
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);