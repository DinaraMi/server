const mongoose = require('mongoose');
const tariffs = require('../config/tariffs');
const { toJSON, paginate } = require('./plugins');

const pageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    epitaph: {
      type: String,
      required: true,
      trim: true,
    },
    epitaphAuthor: {
      type: String,
      trim: true,
    },
    years: {
      type: { birth: Date, death: Date },
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
      default: '/empty/no-avatar.jpg',
    },
    medias: {
      type: {
        images: {
          type: [String],
          default: [],
        },
        audios: {
          type: [String],
          default: [],
        },
        videos: {
          type: [String],
          default: [],
        },
      },
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Пароль должен содержать хотя бы одну цифру и один символ',
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    views: {
      type: Number,
      default: 0,
    },
    location: {
      type: { center: [Number], marker: [Number] },
      default: [[]],
    },
    tariff: {
      type: String,
      enum: Object.values(tariffs),
      required: true,
    },
    options: {
      type: {
        extraSpace: {
          type: Boolean,
          required: true,
        },
        qr: {
          type: Boolean,
          required: true,
        },
        animated: {
          type: Boolean,
          required: true,
        },
        published: {
          type: Boolean,
          required: true,
        },
        indexed: {
          type: Boolean,
          required: true,
        },
        private: {
          type: Boolean,
          required: true,
        },
      },
      required: true,
    },
  },
  {
    timeStamps: true,
  },
);

pageSchema.plugin(toJSON);
pageSchema.plugin(paginate);

/**
 * @typedef Page
 */
const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
