const express = require('express');

const router = express.Router();

const UserContact = require('../models/UserContact');

router.post('/', async (req, res) => {
    try{
        let {formdata}=req.body;
        let firstName=formdata.firstName;
        let lastName=formdata.lastName;
        let email=formdata.email;
        let subject=formdata.subject;
        let message=formdata.message;
        
        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        let userContact=new UserContact({firstName,lastName,email,subject,message});
        await userContact.save();
        res.json({msg:"Form submitted successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({msg:"Server Error"});
    }
    });
module.exports = router; // ✅ Export it correctly