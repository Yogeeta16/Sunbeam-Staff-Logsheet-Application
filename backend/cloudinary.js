const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'pdf', 'docx'], // allowed file types
  },
});

module.exports = { cloudinary, storage };
