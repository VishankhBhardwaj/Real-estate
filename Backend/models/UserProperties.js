const mongoose = require('mongoose');

const userProperties=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true,
      },
      propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Properties",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
},{timestamps:true});

module.exports = mongoose.model('UserProperties', userProperties); // ✅ Export it correctly