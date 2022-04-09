'use strict';
const md5 = require('md5');
const BaseController = require('./base');
// 用来对密码进行二次加密
const HashSalt = 'will@wan-=[]';
class UserController extends BaseController {

  /**
   * 登录
   */
  async login() {
    const { ctx, app } = this;
    const { nickname, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({
      nickname,
      password: md5(password + HashSalt),
    });
    // 登录成功返回token、昵称和邮箱
    if (user) {
      // 生成token
      const { email } = user;
      const token = app.jwt.sign({
        data: {
          email,
          nickname,
          _id: user._id,
        },
        // 设置过期时间这里要使用 exp ，使用 expiresIn 不生效
        exp: Math.floor(Date.now() / 1000) + 10,
      }, app.jwt.secret);
      this.success({
        token,
        nickname,
        userId: user._id,
      });
    } else {
      this.error('用户名或密码错误');
    }

  }

  async checkEmail(email) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ email });
    return user;
  }
  async checkNickname(nickname) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ nickname });
    return user;
  }
  /**
   * 新增用户
   */
  async create() {
    const { ctx } = this;
    // 如果参数错误，会自动返回，不用自己判断
    ctx.validate(ctx.rule.createUserRequest);
    // const { nickname, email, password, captcha } = ctx.request.body;
    const { nickname, email, password } = ctx.request.body;
  //   if (captcha.toLocaleLowerCase() !== ctx.session.captcha.toLocaleLowerCase()) {
  //     this.error('验证码错误');
  //   } else {
      // 邮箱和昵称不能重复
      if (await this.checkEmail(email)) {
        return this.error('该邮箱已经注册过');
      }
      if (await this.checkNickname(nickname)) {
        return this.error('该昵称已被占用');
      }
      const user = {
        nickname,
        email,
        password: md5(password + HashSalt),
      };
      const ret = await ctx.model.User.create(user);
      if (ret._id) {
        this.message('注册成功');
      }
    }
  // }

  /**
   * 获取用户信息
   */
   async getUserList() {
    const { ctx } = this;
    const user = await ctx.model.User.find({});
    this.success(user);
  }

  /**
   * 获取用户信息
   */
  async info() {
    const { ctx } = this;
    const { userId } = ctx.request.query;
    if (!userId) {
      this.error('参数错误');
    } else {
      const user = await ctx.model.User.findOne({ _id: userId });
      this.success(user);
    }
  }

  // 生成验证码，并把验证码文本存入session以便登录是校验
  async captcha() {
    const { ctx } = this;
    const captcha = this.service.tools.captcha();
    ctx.session.captcha = captcha.text;
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
}

module.exports = UserController;
