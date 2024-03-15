/**
 *
 * @param {string} fullpath
 * @returns {string}
 */
const getFilePath = (fullpath) =>
  fullpath
    .split('/')
    .filter((folder) => folder && folder !== 'src' && folder !== 'public')
    .join('/');

module.exports = getFilePath;
