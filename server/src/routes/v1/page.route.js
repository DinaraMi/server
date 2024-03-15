const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const pageValidation = require('../../validations/page.validation');
const pageController = require('../../controllers/page.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth(),
    validate(pageValidation.createPage),
    pageController.createPage,
  )
  .get(validate(pageValidation.getPages), pageController.getPages);

router
  .route('/:pageId')
  .post(
    validate(pageValidation.increasePageView),
    pageController.increasePageView,
  )
  .get(validate(pageValidation.getPage), pageController.getPage)
  .patch(
    auth(),
    validate(pageValidation.updatePage),
    pageController.updatePage,
  )
  .delete(
    auth(),
    validate(pageValidation.deletePage),
    pageController.deletePage,
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Pages
 *  description: Pages managment and retrieval
 */

/**
 * @swagger
 * /pages:
 *   post:
 *     summary: Create page
 *     description: Only users can create pages
 *     tags: [Pages]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - epitaph
 *               - tariff
 *               - options
 *               - user
 *             properties:
 *               name: string
 *               epitaph:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 1024
 *               epitaphAuthor:
 *                 type: string
 *               years:
 *                 type: object
 *                 properties:
 *                   birth:
 *                     type: string
 *                     format: date-time
 *                   death:
 *                     type: string
 *                     format: date-time
 *               avatar: string
 *               medias:
 *                 $ref: '#/components/schemas/Media'
 *               user: string
 *               location:
 *                 type: object
 *                 properties:
 *                   center:
 *                     $ref: '#/components/schemas/Location'
 *                   marker:
 *                     $ref: '#/components/schemas/Location'
 *               tariff:
 *                 type: string
 *                 enum: [basic, media]
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               options:
 *                  type: object
 *                  properties:
 *                    indexed: boolean
 *                    published: boolean
 *                    extraSpace: boolean
 *                    qr: boolean
 *                    animated: boolean
 *                    private: boolean
 *
 *             example:
 *               name: fake name
 *               epitaph: fake epitaph
 *               epitaphAuthor: fake epitaph author
 *               years:
 *                 - birth: 2020-05-12T16:18:04.793Z
 *                 - death: 2020-05-12T16:18:04.793Z
 *               avatar: /images/1/avatar.png
 *               user: 1
 *               tariff: basic
 *               password: password1
 *               options:
 *                 - indexed: true
 *                 - published: true
 *                 - extraSpace: false
 *                 - qr: false
 *                 - animated: false
 *                 - private: false
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Page'
 */
