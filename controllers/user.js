const User = require('../db/user')
const Article = require('../db/ArticleModel')

const GetUserData = async(req,res) => {
    const {id}= req.user
    try {
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({status: 'user not found'})
        }
        return res.status(200).json({status: 'user found', user})
    } catch (err) {
        
    }
}
const AddToFavs = async (req,res) => {
    try {
        const { id : userId } = req.user
        const { id : articleId } = req.params
        const user = await User.findById(userId)
        const article = await Article.findById(articleId)
        for(i of user.favorites) {
            if(i._id == articleId) {
                return res.status(400).json({status: 'article already in favorites'})
            }
        }
        user.favorites.push(article)
        await user.save()
        return res.status(200).json({status: 'article added to favorites'})
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: 'server error'})
    }
}
module.exports = {
    AddToFavs,
    GetUserData
}