/**
 *
 * @param {string} mimeType
 * @returns {'audios' | 'videos' | 'images' | string}
 */
const getFileType = (mimeType) => `${mimeType.split('/')[0]}s`;

module.exports = getFileType;
