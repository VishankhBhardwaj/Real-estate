const express = require('express');
const { getAllProperties, getPropertyById } = require('../controllers/propertyController');
const router = express.Router();

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

module.exports = router;
