const {Schema,model} = require('mongoose')
const Article = require('./ArticleModel')
const UserSchema = new Schema({
    fullname :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    favorites : [Article.schema],
})
module.exports = model('Users',UserSchema)