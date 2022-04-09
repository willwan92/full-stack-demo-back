module.exports = {
  createUserRequest: {
    nickname: {
      type: 'string', required: true, description: '昵称'
      , example: '18801731528', format: /^1[34578]\d{9}$/,
    },
    password: {
      type: 'string', required: true, description: '密码'
      , example: '111111',
    },
    email: {
      type: 'string', required: true, description: '邮箱'
      , example: 'abc@163.com'
    },
  },
}