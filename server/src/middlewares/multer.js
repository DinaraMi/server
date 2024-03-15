const multer = require('multer');
const fs = require('fs');
const path = require('path');
const getFileType = require('../utils/getFileType');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const fileType = getFileType(file.mimetype);
      if (
        fileType === 'audios' ||
        fileType === 'videos' ||
        fileType === 'images'
      ) {
        const filePath = path.join(
          'src/public',
          fileType,
          req.headers.user,
        );
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        cb(null, filePath);
      } else {
        throw new Error('Invalid file type');
      }
    } catch (err) {
      console.error(err);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 25 } }); // 25 Mb

module.exports = upload;
