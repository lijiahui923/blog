'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/uploadImg', controller.upload.uploadImg);
  
  router.resources('user', '/user', controller.user);
  router.resources('article', '/article', controller.article);
};
