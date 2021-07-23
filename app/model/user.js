// 数据模型
module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema

    const UserSchema = new Schema({
        nickname: {
            type: String
        },
        password: {
            type: String
        },
        email: {
            type: String
        },
    })

    return mongoose.model('User', UserSchema)
}