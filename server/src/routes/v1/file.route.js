const express = require('express');
const fileController = require('../../controllers/file.controller');
const upload = require('../../middlewares/multer');
const getFilePath = require('../../utils/getFilePath');

const router = express.Router();

router.route('/upload').post(upload.array('files', 1), (req, res) => {
  res
    .status(200)
    .send({ success: true, message: getFilePath(req.files[0].path) });
});

router
  .route('/upload/avatar')
  .post(upload.single('avatar'), (req, res) => {
    res
      .status(200)
      .send({ success: true, message: getFilePath(req.file.path) });
  });

router
  .route('/:media/:userId/:filename')
  .get(fileController.getFile)
  .delete(fileController.deleteFile);

module.exports = router;
