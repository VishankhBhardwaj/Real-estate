const express = require('express');
const router = express.Router();

const TeamDetails = require('../models/TeamDetails');

router.get('/', async (req, res) => {
    try {
        const team = await TeamDetails.find();
        res.status(200).json(team);
    } catch (error) {
        console.error("Error fetching team data:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
});


module.exports = router;