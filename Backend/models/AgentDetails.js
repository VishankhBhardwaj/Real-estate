const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salesVolume: { type: String, required: true },
    totalSales: { type: Number, required: true },
    averageRating: { type: Number, required: true },
    profileImage: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    experience: { type: String, required: true },
    specialization: { type: [String], required: true },
    achievements: { type: [String], required: true },
    aboutMe: { type: String, required: true }
});

module.exports = mongoose.model('Agent', AgentSchema);
