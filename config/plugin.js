'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
//   mongoose: {
//     enable: true,
//     package: 'egg-mongoose'
//   }
// };

exports.mongoose = {
  enalbe:true,
  package:'egg-mongoose'
}

exports.jwt = {
  enable: true,
  package: "egg-jwt"
}

