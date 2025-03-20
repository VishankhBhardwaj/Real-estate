const express = require('express');

const UserProperties = require('../models/UserProperties');

const router = express.Router();

router.post('/',async(req,res)=>{
    try{
        let {userId,propertyId}=req.body;
        if (!userId || !propertyId) {
            return res.status(400).json({ msg: "userId and propertyId are required" });
        }
        //check existing
        let existing=await UserProperties.findOne({userId,propertyId});
        if(existing){
            return res.status(400).json({msg:"Property already added"});
        }
        let userProperites=new UserProperties({userId,propertyId});
        await userProperites.save();
        res.json({msg:"Property added successfully"});
    }catch(error){
        return res.status(500).json({msg:"Server Error"});
    }
})
router.get('/:userId',async(req,res)=>{
    try{
        let {userId}=req.params;
        let userProperties=await UserProperties.find({userId}).populate('propertyId');
        if(userProperties.length==0){
            return res.status(400).json({msg:"No Properties found"});
        }
        console.log(userProperties);
        res.json(userProperties);
    }catch(error){
        return res.status(500).json({msg:"Server Error"});
    }
});
router.delete('/remove',async(req,res)=>{
    try {
        let { userId, propertyId } = req.body;

        if (!userId || !propertyId) {
            return res.status(400).json({ msg: "userId and propertyId are required" });
        }

        let deletedProperty = await UserProperties.findOneAndDelete({ userId, propertyId });

        if (deletedProperty) {
            return res.json({ msg: "Property removed successfully" });
        } else {
            return res.status(400).json({ msg: "Failed to remove property from list" });
        }
    } catch (error) {
        console.error("Error deleting property:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
})
module.exports = router; // ✅ Export it correctly