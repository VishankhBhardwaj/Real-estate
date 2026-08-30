const express = require('express');
const router = express.Router();
const { getAgents, getAgentById } = require('../controllers/agentDetailsController');

router.get('/', getAgents);
router.get('/:agentId', getAgentById);

module.exports = router;