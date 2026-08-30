const express = require('express');
const { getAllTopPicks } = require('../controllers/toppicksController');

const router = express.Router();

router.get('/', getAllTopPicks);

module.exports = router;
