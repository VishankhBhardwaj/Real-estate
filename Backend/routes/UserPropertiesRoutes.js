const express = require('express');
const { addUserProperty, getUserProperties, removeUserProperty } = require('../controllers/userPropertiesController');

const router = express.Router();

router.post('/', addUserProperty);
router.get('/:userId', getUserProperties);
router.delete('/remove', removeUserProperty);

module.exports = router;