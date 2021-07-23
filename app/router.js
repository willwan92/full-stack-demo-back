'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/user/captcha', controller.user.captcha);
  router.get('/user/info', controller.user.info);
  router.post('/user/create', controller.user.create);
};
