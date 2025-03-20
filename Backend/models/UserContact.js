const mongoose = require('mongoose');

const userContact= new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
      },
      LastName: {
        type: String,
        required: true,
      },
      Email: {
        type: String,
        required: true,
        maxlength: 255,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
      },
        Subject: {
            type: String,
            required: true,
        },
      Message: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Pending",
      },
},{timestamps:true});

module.exports = mongoose.model('UserContact', userContact); // ✅ Export it correctly