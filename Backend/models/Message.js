const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation',
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    text:{
        type:String,
        trim:true,
        required:true
    },
    senderType:{
        type:String,
        enum:['buyer','agent'],
        required:true
    },
    read:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = mongoose.model('Message',messageSchema);