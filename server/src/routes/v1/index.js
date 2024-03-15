const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const pageRoute = require('./page.route');
const fileRoute = require('./file.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/pages',
    route: pageRoute,
  },
  {
    path: '/files',
    route: fileRoute,
  },
];

// routes available only in development mode
const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
