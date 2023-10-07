const Model = require('../db/CommunityModel')
const User = require('../db/user')

const GetAllPosts = async(req,res) => {
    try {
        const posts = await Model.find({})
        return res.status(200).json({status: 'posts found', posts})
    }catch(err){
        console.log(err)
        return res.status(500).json({status: 'server error'})
    }
}
const AddPost = async(req,res) => {
    const {id,email} = req.user
    try{
        const user = await User.findById(id)
        const body = {
            ...req.body,
            author : user
        }
        const post = await Model.create(body)
        return res.status(200).json({status: 'post added', post})
    }catch(err){
        console.log(err)
        return res.status(500).json({status: 'server error'})
    }
}

const AddComment = async(req,res) => {
    const {id} = req.params
    const {id : userId} = req.user
    const {comment} = req.body
    try{
        const user = await User.findById(userId)
        const body = {
            comment,
            author : user
        }
        const post = await Model.findByIdAndUpdate(id,{$push : {comments : body}})
        return res.status(200).json({status: 'comment added', post})
    }catch(err){
        console.log(err)
        return res.status(500).json({status: 'server error'})
    }
}

const GetPost = async(req,res) => {
    const {id} = req.params
    try {
        const post = await Model.findById(id)
        if(post) {
            return res.status(200).json({status: 'post found', post})
        }
        return res.status(404).json({status: 'post not found'})
    }catch(err){
        console.log(err)
        return res.status(500).json({status: 'server error'})
    }
}
module.exports = {
    GetAllPosts,
    AddPost,
    AddComment,
    GetPost
}