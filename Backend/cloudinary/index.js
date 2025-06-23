const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads', 
        allowed_formats: ['jpg', 'png', 'jpeg'], 
        transformation: [{ width: 800, height: 800, crop: "limit" }], 
        resource_type: "auto" 
    },
    limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports = {
    cloudinary,
    storage
};
