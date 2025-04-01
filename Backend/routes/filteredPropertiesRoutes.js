const express = require('express');
const Propertiesmodel = require('../models/Properties');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { location,minPrice,maxPrice,bedrooms} = req.body;
        let query={};
        if(location){
            query.location={ $regex: location, $options: "i" }; // "i" makes it case-insensitive;
        }
        if(minPrice && maxPrice){
            query.price={$gte:minPrice,$lte:maxPrice};
        }
        else if(minPrice){
            query.price={$gte:minPrice};
        }
        else if(maxPrice){
            query.price={$lte:maxPrice};
        }
        if(bedrooms){
            query.bedrooms=bedrooms;
        }
        let properties = await Propertiesmodel.find(query);
        if (properties.length === 0) {
            return res.status(400).json({ msg: 'No Properties found' });
        } else {
            res.json(properties);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;