const Propertiesmodel = require('../models/Properties');
const ViewPropertiesmodel = require('../models/ViewProperties');

const getAllProperties = async (req, res) => {
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
};

const getPropertyById = async (req, res) => {
    try {
        let propertyId = req.params.id;
        const propertyDetails = await ViewPropertiesmodel.findOne({ propertyId: propertyId }).populate('propertyId');
        if (!propertyDetails) {
            return res.status(400).json({ msg: 'No Property found' });
        } else {
            res.json(propertyDetails);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllProperties,
    getPropertyById
};
