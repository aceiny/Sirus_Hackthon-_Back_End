const {Schema,model} = require('mongoose')
const ArticleSchema = new Schema({
    title  :{
        type:String,
        required:true
    },
    paragraphs:{
        type:Array,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    published:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default : 1
    },
    watched:{
        type:Number,
        default : 0
    },
    createdAt  :{
        type:Date,
        default:Date.now
    },


})
module.exports = model('Articles',ArticleSchema)