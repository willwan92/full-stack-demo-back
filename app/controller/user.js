'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  async create() {
    const { ctx } = this
    if (ctx.request.body.captcha.toLocaleLowerCase() !== ctx.session.captcha.toLocaleLowerCase()) {
      this.error('验证码错误')
    } else {
      this.message('注册成功')
    }
  }

  // 生成验证码，并把验证码文本存入session以便登录是校验
  async captcha() {
    const { ctx } = this
    const captcha = this.service.tools.captcha()
    ctx.session.captcha = captcha.text
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
  }
}

module.exports = UserController;