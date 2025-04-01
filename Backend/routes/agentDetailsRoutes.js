const express = require('express');
const router = express.Router();
const AgentDetails = require('../models/AgentDetails');

router.get('/', async (req, res) => {
    try {
        const agents = await AgentDetails.find();
        res.status(200).json(agents);
    } catch (error) {
        console.error("Error fetching agent data:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
}
);
router.get('/:agentId', async (req, res) => {
    const agentId = req.params.agentId;
    try {
        const agent = await AgentDetails.findOne({ _id: agentId });
        if (!agent) {
            res.status(404).json({ message: `Agent with id ${agentId} not found` });
            return;
        }
        res.status(200).json(agent);
    } catch (error) {
        console.error("Error fetching agent data:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
}
);
module.exports = router;