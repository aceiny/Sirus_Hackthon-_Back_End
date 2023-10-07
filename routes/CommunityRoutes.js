const express = require('express')
let router = express.Router()

const {
    GetAllPosts,
    AddPost,
    AddComment,
    GetPost
} = require('../controllers/community')
const {
    decodeToken,
    checkToken
} = require('../controllers/auth')

router.route('/').get(GetAllPosts).post(decodeToken,AddPost)
router.route('/:id').get(GetPost).put(decodeToken,AddComment)

module.exports = router