const mongoose = require('mongoose');

const toppicksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
        required: true,
        max: 255
    },
    image: {
        type: String,
        required: true,
        max: 255
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    location: {
        type: String,
        required: true,
        max: 255
    },
},{timelapsed:true});

module.exports = mongoose.model('Toppicks', toppicksSchema);
