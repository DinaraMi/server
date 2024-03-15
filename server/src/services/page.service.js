const httpStatus = require('http-status');
const { Page } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * @param {Object} pageBody
 * @returns {Promise<Page>}
 */
const createPage = async (pageBody) => {
  return Page.create(pageBody);
};

/**
 * Query for pages
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPages = async (filter, options) => {
  const pages = await Page.paginate(filter, options);
  return pages;
};

/**
 * Get page by id
 * @param {ObjectId} id
 * @returns {Promise<Page>}
 */
const getPageById = async (id) => {
  return Page.findById(id);
};

/**
 * Update page by id
 * @param {ObjectId} pageId
 * @param {Object} updateBody
 * @returns {Promise<Page>}
 */
const updatePageById = async (pageId, updateBody) => {
  const page = await getPageById(pageId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
  }
  Object.assign(page, updateBody);
  await page.save();
  return page;
};

const increasePageViewById = async (pageId) => {
  const page = await getPageById(pageId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
  }
  Object.assign(page, { views: page.views + 1 });
  await page.save();
};

/**
 * Delete page by id
 * @param {ObjectId} pageId
 * @returns {Promise<Page>}
 */
const deletePageById = async (pageId) => {
  const page = await getPageById(pageId);
  if (!page) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
  }
  await page.remove();
  return page;
};

module.exports = {
  createPage,
  queryPages,
  getPageById,
  updatePageById,
  increasePageViewById,
  deletePageById,
};
