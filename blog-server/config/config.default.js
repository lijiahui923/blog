/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path')
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1638858987064_981';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 关闭crsf,开启跨域
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [],
  }
  // 静态文件
  config.static = {
    prefix: '/public',
    dir: path.join(appInfo.baseDir, 'app/public/img'),
    dynamic: true,
    preload: false,
    maxAge: 30000000,
    buffer: true
  }
  // 允许跨域方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT,  POST, DELETE, PATCH',
  }
  config.sequelize = {
    dialect: 'mysql',
    host: '139.196.220.37',
    port: 3306,
    database: 'ljh_blog',
    username: 'root',
    password: '123456',
    define: {
      underscored: true,
      freezeTableName: true
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
