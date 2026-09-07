const AgentDetails = require('../models/AgentDetails');
const Usermodel = require('../models/user');

const getAgents = async (req, res) => {
    try {
        const agentDetailsList = await AgentDetails.find();
        const agentUsers = await Usermodel.find({ role: 'agent' });

        const existingAgentIds = new Set(agentDetailsList.map(a => a._id.toString()));
        const additionalAgents = agentUsers
            .filter(u => !existingAgentIds.has(u._id.toString()))
            .map(u => ({
                _id: u._id,
                name: u.name,
                email: u.email,
                role: 'Real Estate Agent',
                location: 'Verified Agent',
                salesVolume: '$1M+',
                totalSales: 5,
                averageRating: 5.0,
                profileImage: u.profilePic || 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
                phoneNumber: String(u.phonenumber),
                experience: '2+ Years',
                specialization: ['Residential', 'Luxury Homes'],
                achievements: ['Verified Luxury Partner'],
                aboutMe: `Hello! I am ${u.name}, a certified agent on LuxuryEstate.`
            }));

        res.status(200).json([...agentDetailsList, ...additionalAgents]);
    } catch (error) {
        console.error("Error fetching agent data:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
};

const getAgentById = async (req, res) => {
    const agentId = req.params.agentId;
    try {
        let agent = await AgentDetails.findOne({ _id: agentId });
        if (!agent) {
            const userAgent = await Usermodel.findOne({ _id: agentId });
            if (userAgent) {
                agent = {
                    _id: userAgent._id,
                    name: userAgent.name,
                    email: userAgent.email,
                    role: userAgent.role === 'agent' ? 'Real Estate Agent' : 'Agent',
                    location: 'Verified Agent',
                    salesVolume: '$1M+',
                    totalSales: 5,
                    averageRating: 5.0,
                    profileImage: userAgent.profilePic || 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
                    phoneNumber: String(userAgent.phonenumber),
                    experience: '2+ Years',
                    specialization: ['Residential', 'Luxury Homes'],
                    achievements: ['Verified Luxury Partner'],
                    aboutMe: `Hello! I am ${userAgent.name}, a certified agent on LuxuryEstate.`
                };
            }
        }
        if (!agent) {
            return res.status(404).json({ message: `Agent with id ${agentId} not found` });
        }
        res.status(200).json(agent);
    } catch (error) {
        console.error("Error fetching agent data:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
};

module.exports = {
    getAgents,
    getAgentById
};
