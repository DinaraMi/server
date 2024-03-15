const httpStatus = require('http-status');
const path = require('path');
const { rm } = require('fs/promises');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const getFile = catchAsync(async (req, res) => {
  const { media, userId, filename } = req.params;
  if (media !== 'videos' && media !== 'images' && media !== 'audios') {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data type not found');
  }
  const filePath = path.resolve('src/public', media, userId, filename);
  res.sendFile(filePath);
});

const deleteFile = catchAsync(async (req, res) => {
  const { media, userId, filename } = req.params;
  if (media !== 'videos' && media !== 'images' && media !== 'audios') {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data type not found');
  }
  const filePath = path.resolve('src/public', media, userId, filename);
  try {
    await rm(filePath);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    console.error(err);
  }
});

module.exports = {
  getFile,
  deleteFile,
};
