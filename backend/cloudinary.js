const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage for Modules
const moduleStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'modules',
    allowed_formats: ['pdf', 'docx', 'pptx', 'jpg', 'png'],
    resource_type: 'raw', // for documents
  },
});

// Multer Storage for Schedules
const scheduleStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'schedules',
    allowed_formats: ['xlsx', 'xls'],
    resource_type: 'raw', // for Excel
  },
});

module.exports = { cloudinary, moduleStorage, scheduleStorage };
