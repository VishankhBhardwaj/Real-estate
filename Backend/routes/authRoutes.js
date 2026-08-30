const express = require('express');
const cookieParser = require('cookie-parser');
const { storage } = require('../cloudinary/index');
const multer = require('multer');
const { signUp, signIn, updateProfile, getUserById } = require('../controllers/authController');

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, 
});

const router = express.Router();
router.use(cookieParser());

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/update', upload.single('file'), updateProfile);
router.get('/:id', getUserById);

module.exports = router;
