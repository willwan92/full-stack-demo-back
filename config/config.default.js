/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1:27017/demo',
        options: {}
      }
    },
    swaggerdoc: {
      dirScanner: './app/controller',
        apiInfo: {
        title: '官网管理后台接⼝',
        description: '官网管理后台接⼝ swagger-ui for egg',
        version: '1.0.0',
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      enableSecurity: false,
      // enableValidate: true,
      routerMap: true,
      enable: true,
    },
    jwt: {
      secret: 'willwan92'
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1625726121147_1965';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    security:{
      csrf:{
        enable:false
      }
    }
  }
};
