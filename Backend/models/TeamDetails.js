const mongoose = require('mongoose');

const teamDetailsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('teamDetails', teamDetailsSchema);