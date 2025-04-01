const express = require('express');
const Propertiesmodel = require('../models/Properties');
const ViewPropertiesmodel = require('../models/ViewProperties');
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
router.get('/:id', async (req, res) => {
    try{
        let propertyId = req.params.id;
        const propertyDetails = await ViewPropertiesmodel.findOne({ propertyId: propertyId }).populate('propertyId');
        if(!propertyDetails){
            return res.status(400).json({msg:'No Property found'});
        }else{
            res.json(propertyDetails);
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});
// Get All ViewProperties
module.exports = router;
