const express = require('express');
const router = express.Router();
const AgentDetails = require('../models/AgentDetails');

router.get('/', async (req, res) => {
    try {
        const agents = await AgentDetails.find();
        console.log("Agents data:", agents);
        res.status(200).json(agents);
    } catch (error) {
        console.error("Error fetching agent data:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
}
);

module.exports = router;