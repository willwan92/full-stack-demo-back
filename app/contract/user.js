module.exports = {
  createUserRequest: {
    nickname: {
      type: 'string', required: true, description: '昵称'
      , example: 'will',
    },
    password: {
      type: 'string', required: true, description: '密码'
      , example: '111111',
    },
    email: {
      type: 'string', required: true, description: '邮箱'
      , example: 'abc@163.com', format: /^\w+@[\da-z\.-]+\.([a-z]{2,6}|[\u2E80-\u9FFF]{2,3})$/
    },
  },
}