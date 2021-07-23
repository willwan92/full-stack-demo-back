'use strict';
const md5 = require('md5')
const BaseController = require('./base')
// 用来对密码进行二次加密
const HashSalt = 'will@wan-=[]'
class UserController extends BaseController {

  async checkEmail(email) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({ email })
    return user
  }
  async checkNickname(nickname) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({ nickname })
    return user
  }
  /**
   * 新增用户
   */
  async create() {
    const { ctx } = this
    const { nickname, email, password, captcha } = ctx.request.body
    if (captcha.toLocaleLowerCase() !== ctx.session.captcha.toLocaleLowerCase()) {
      this.error('验证码错误')
    } else {
      // 邮箱和昵称不能重复
      if (await this.checkEmail(email)) {
        return this.error('该邮箱已经注册过')
      }
      if (await this.checkNickname(nickname)) {
        return this.error('该昵称已被占用')
      }
      const user = {
        nickname,
        email,
        password: md5(password + HashSalt)
      }
      const ret = await ctx.model.User.create(user)
      if (ret._id) {
        this.message('注册成功')
      }
    }
  }

  async info() {
    const { ctx } = this
    const userId = ctx.request.search.userId
    if (!userId) {
      this.error('参数错误')
    } else {
      const user = await ctx.model.User.findOne(user => user._id === userId)
      this.success(user)
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