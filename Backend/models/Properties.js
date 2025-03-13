const mongoose = require('mongoose');

const PropertiesSchema = new mongoose.Schema({
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
    bedroom:{
        type: Number,
        required: true,
        min: 1
    },
    bathroom:{
        type: Number,
        required: true,
        min: 1
    },
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    }
},{timelapsed:true});

module.exports = mongoose.model('Properties', PropertiesSchema);
