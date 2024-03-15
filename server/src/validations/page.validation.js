const Joi = require('joi');
const { objectId, password } = require('./custom.validation');
const { tariffTypes } = require('../config/tariffs');

const createPage = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    epitaph: Joi.string().required().max(1024).min(1),
    epitaphAuthor: Joi.string(),
    years: Joi.object()
      .keys({
        birth: Joi.date().required(),
        death: Joi.date().required(),
      })
      .required(),
    avatar: Joi.string(),
    medias: Joi.object().keys({
      images: Joi.array().items(Joi.string()),
      audios: Joi.array().items(Joi.string()),
      videos: Joi.array().items(Joi.string()),
    }),
    user: Joi.string().custom(objectId).required(),
    location: Joi.object().keys({
      center: Joi.array().items(Joi.number).length(2).required(),
      marker: Joi.array().items(Joi.number).length(2).required(),
    }),
    tariff: Joi.string()
      .required()
      .valid(...Object.values(tariffTypes)),
    password: Joi.string().custom(password),
    options: Joi.object()
      .keys({
        extraSpace: Joi.boolean().required(),
        qr: Joi.boolean().required(),
        animated: Joi.boolean().required(),
        published: Joi.boolean().required(),
        indexed: Joi.boolean().required(),
        private: Joi.boolean().required(),
      })
      .required(),
  }),
};

const getPages = {
  query: Joi.object().keys({
    name: Joi.string(),
    epitaph: Joi.string(),
    epitaphAuthor: Joi.string(),
    user: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPage = {
  params: Joi.object().keys({
    pageId: Joi.string().custom(objectId),
  }),
};

const updatePage = {
  params: Joi.object().keys({
    pageId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      epitaph: Joi.string().max(1024).min(1),
      epitaphAuthor: Joi.string(),
      years: Joi.object()
        .keys({
          birth: Joi.date(),
          death: Joi.date(),
        })
        .min(1),
      avatar: Joi.string(),
      medias: Joi.object()
        .keys({
          images: Joi.array().items(Joi.string()),
          audios: Joi.array().items(Joi.string()),
          videos: Joi.array().items(Joi.string()),
        })
        .min(1),
      views: Joi.number().integer(),
      location: Joi.object()
        .keys({
          center: Joi.array().items(Joi.number).length(2),
          marker: Joi.array().items(Joi.number).length(2),
        })
        .min(1),
      tariff: Joi.string().valid(...Object.values(tariffTypes)),
      password: Joi.string().custom(password),
      options: Joi.object()
        .keys({
          extraSpace: Joi.boolean(),
          qr: Joi.boolean(),
          animated: Joi.boolean(),
          published: Joi.boolean(),
          indexed: Joi.boolean(),
          private: Joi.boolean(),
        })
        .min(1),
    })
    .min(1),
};

const increasePageView = {
  params: Joi.object().keys({
    pageId: Joi.string().custom(objectId),
  }),
};

const deletePage = {
  params: Joi.object().keys({
    pageId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPage,
  getPages,
  getPage,
  updatePage,
  increasePageView,
  deletePage,
};
