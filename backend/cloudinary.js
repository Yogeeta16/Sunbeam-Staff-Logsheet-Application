const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const moduleStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'modules',
    resource_type: 'raw', // required for PDFs, DOCX, PPT, images
    allowed_formats: ['pdf'],
    public_id: (req, file) => `${Date.now()}_${file.originalname.split('.')[0]}`,
  },
});

// ====== Multer Storage for Schedules (Excel) ======
const scheduleStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'schedules',
      resource_type: 'raw',
      allowed_formats: ['xlsx', 'xls'],
      public_id: `${Date.now()}_${file.originalname.split('.')[0]}`,
    };
  },
});

// Optional: debug function to test Cloudinary upload
async function testUpload(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, { resource_type: 'raw' });
    console.log('Cloudinary upload successful:', result.secure_url);
  } catch (err) {
    console.error('Cloudinary upload error:', err);
  }
}

module.exports = {
  cloudinary,
  moduleStorage,
  scheduleStorage,
  testUpload,
};
