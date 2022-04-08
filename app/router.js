'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });
  router.get('/user/captcha', controller.user.captcha);
  router.get('/user/info', jwt, controller.user.info);
  router.post('/user/create', controller.user.create);
  router.post('/user/login', controller.user.login);
};
