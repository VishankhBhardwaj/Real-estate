const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
require('./db/config');
const Usermodel = require('./models/user');
const Toppicksmodel = require('./models/toppicks');
const Propertiesmodel = require('./models/Properties');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send('Hello World');
});
app.post('/signUp', (req, res) => {
    let { email, password,name,phonenumber } = req.body;
    if (!email || !password || !name || !phonenumber) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                password = hash;
                const user = new Usermodel({
                    name,
                    email,
                    password,
                    phonenumber
                });
                user.save().then(user => {
                    res.json({
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            phonenumber: user.phonenumber
                        }
                    });
                });
            });
        });
    }
});
app.post('/signIn', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    else{
        let user= await Usermodel.findOne({email:email});
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                res.json({msg:'Login Successfull', user});
            }
            else{
                res.json({msg:'Login Failed'});
            }
        });
    }
});
app.get('/toppicks', async (req, res) => {
    try {
        let toppicks = await Toppicksmodel.find();
        if(toppicks.length==0){
            return res.status(400).json({msg:'No Toppicks found'});
        }else{
            res.json(toppicks);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});
app.get("/properties", async (req, res) => {
    try{
        const property= await Propertiesmodel.find();
        if(property.length==0){
            return res.status(400).json({msg:'No Properties found'});
        }else{
            res.json(property);
        }
    }catch(err){
        console.log(err);
    }
});
app.listen(3000, () => console.log('Server is running on port 3000...'));
