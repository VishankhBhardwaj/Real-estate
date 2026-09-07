const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    agent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Agent',
        required:true
    },
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Properties',
        required:false
    }
},{timestamps:true});

module.exports = mongoose.model('Conversation',conversationSchema);