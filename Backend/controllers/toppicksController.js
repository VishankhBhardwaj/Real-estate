const Toppicksmodel = require('../models/toppicks');

const getAllTopPicks = async (req, res) => {
    try {
        let toppicks = await Toppicksmodel.find();
        if (toppicks.length === 0) {
            return res.status(400).json({ msg: 'No Toppicks found' });
        } else {
            res.json(toppicks);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllTopPicks
};
