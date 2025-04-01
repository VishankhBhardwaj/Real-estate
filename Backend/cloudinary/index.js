const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Fix: Add max file size (50MB) & auto-format/compression
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads', // ✅ Cloudinary folder name
        allowed_formats: ['jpg', 'png', 'jpeg'], // ✅ Allowed formats
        transformation: [{ width: 800, height: 800, crop: "limit" }], // ✅ Optional: Resize large images
        resource_type: "auto" // ✅ Allows images & videos
    },
    limits: { fileSize: 50 * 1024 * 1024 }, // ✅ 50MB limit
});

module.exports = {
    cloudinary,
    storage
};
