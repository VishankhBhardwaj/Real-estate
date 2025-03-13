const express = require('express');
const Propertiesmodel = require('../models/Properties');

const router = express.Router();

// Get All Properties
router.get('/', async (req, res) => {
    try {
        const property = await Propertiesmodel.find();
        if (property.length === 0) {
            return res.status(400).json({ msg: 'No Properties found' });
        } else {
            res.json(property);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
