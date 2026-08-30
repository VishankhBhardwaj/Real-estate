const express = require('express');
const { filterProperties } = require('../controllers/filteredPropertiesController');

const router = express.Router();

router.post('/', filterProperties);

module.exports = router;