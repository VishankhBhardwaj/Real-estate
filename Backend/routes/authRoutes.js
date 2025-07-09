const express = require('express');
const bcrypt = require('bcrypt');
const Usermodel = require('../models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { cloudinary, storage } = require('../cloudinary/index');
const multer = require('multer');
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, 
});
const router = express.Router();
router.use(cookieParser());

// Signup Route
router.post('/signUp', async (req, res) => {
    let { email, password, name, phonenumber } = req.body;
    if (!email || !password || !name || !phonenumber) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new Usermodel({
            name,
            email,
            password: hash,
            phonenumber
        });

        const savedUser = await user.save();
        let token = jwt.sign({ email: email }, "secretkey");

        // ✅ FIXED: Removed duplicate response issue
        res.cookie("token", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
        if(!savedUser) {
            return res.status(400).json({ msg: 'User registration failed' });
        }
        else{
            return res.json({ 
                msg: 'User registered successfully',
                user: {
                    _id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    phonenumber: savedUser.phonenumber
                }
            });
        }
        

    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error'); 
    }
});

// Signin Route
router.post('/signIn', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' }); 
    }

    try {
        let user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' }); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' }); 
        }

        let token = jwt.sign({ email: email }, "secretkey");

        // ✅ FIXED: Merged cookie setting with JSON response
        res.cookie("token", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        return res.json({ msg: 'Login Successful', user }); 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error'); 
    }
});
router.post('/update',upload.single('file'), async (req, res) => {
    const userInfo = JSON.parse(req.body.userInfo);
    const fileUrl = req.file.path;
    if (!fileUrl) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const result= await Usermodel.findOne({_id:userInfo._id});
    if(result){
        const updatedUser = await Usermodel.findByIdAndUpdate(userInfo._id,{
            name:userInfo.name,
            email:userInfo.email,
            profilePic: fileUrl,
        },{new:true});
        
        if(updatedUser){
            return res.json({msg:"Profile updated successfully"});
        }
        else{
            return res.status(400).json({msg:"Failed to update profile"});
        }
    }
});
router.get('/:id', async (req, res) => {
    try {
        let user = await Usermodel.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ msg: 'User not found' }); 
        }
        return res.json(user); 
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
});
module.exports = router;
