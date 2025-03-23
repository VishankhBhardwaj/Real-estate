const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salesVolume: { type: String, required: true },
    totalSales: { type: Number, required: true },
    averageRating: { type: Number, required: true },
});

module.exports = mongoose.model('Agent', AgentSchema);
