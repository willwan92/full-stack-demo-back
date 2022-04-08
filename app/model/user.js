'use strict';

// 数据模型
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    nickname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    email: {
      type: String,
      require: true,
    },
    __v: {
      type: Number,
      select: false,
    },
  });

  return mongoose.model('User', UserSchema);
};
