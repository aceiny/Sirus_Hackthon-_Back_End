const {Schema,model} = require('mongoose')
const User = require('./user')

const CommentsSchema = ({
    author : User.schema,
    comment : {
        type:String,
        required:true
    },
    createdAt  :{
        type:Date,
        default:Date.now
    },
}) 
const CommunitySchema = new Schema({
    context : {
        type:String,
        required:true
    },
    Image : {
        type:String,
    },
    author : User.schema,
    createdAt  :{
        type:Date,
        default:Date.now
    },
    comments : [CommentsSchema]
})
module.exports = model('Community',CommunitySchema)