const express = require('express');
const bcrypt = require('bcrypt');
const Usermodel = require('../models/user');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(cookieParser());

// Signup Route
router.post('/signUp', async (req, res) => {
    let { email, password, name, phonenumber } = req.body;
    if (!email || !password || !name || !phonenumber) {
        return res.status(400).json({ msg: 'Please enter all fields' }); // ✅ FIXED: Added return to prevent further execution
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
        console.log(savedUser);
        let token = jwt.sign({ email: email }, "secretkey");

        // ✅ FIXED: Removed duplicate response issue
        res.cookie("token", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
        if(!savedUser) {
            return res.status(400).json({ msg: 'User registration failed' }); // ✅ FIXED: Added return
        }
        else{
            return res.json({  // ✅ FIXED: Using return to prevent further execution
                msg: 'User registered successfully',
                user: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    phonenumber: savedUser.phonenumber
                }
            });
        }
        

    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error'); // ✅ FIXED: Added return to prevent multiple responses
    }
});

// Signin Route
router.post('/signIn', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' }); // ✅ FIXED: Added return
    }

    try {
        let user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' }); // ✅ FIXED: Added return
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' }); // ✅ FIXED: Added return
        }

        let token = jwt.sign({ email: email }, "secretkey");

        // ✅ FIXED: Merged cookie setting with JSON response
        res.cookie("token", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        return res.json({ msg: 'Login Successful', user }); // ✅ FIXED: Using return to stop execution after response
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error'); // ✅ FIXED: Added return to prevent multiple responses
    }
});

module.exports = router;
