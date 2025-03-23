const mongoose = require('mongoose');

const ViewPropertiesSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Properties',  // Referencing the Properties model
        required: true
    },
    images: [{
        type: String,
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('ViewProperties', ViewPropertiesSchema);