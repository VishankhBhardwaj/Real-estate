const mongoose = require('mongoose');

const userContact= new mongoose.Schema({
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: { 
        type: String, 
        required: true, 
        // unique: true, 
        lowercase: true, 
        maxlength: 255, 
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        sparse: true
    },    
      subject: {
            type: String,
            required: true,
        },
      message: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Pending",
      },
},{timestamps:true});

module.exports = mongoose.model('UserContact', userContact); // ✅ Export it correctly