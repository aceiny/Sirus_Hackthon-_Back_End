const express = require('express')
let router = express.Router() // get the router from expresss

const {
    decodeToken,
    checkToken
        } = require('../controllers/auth') // get the function that we will use
const {
    GetAllArticles,
    AddArticle,
    IncWatched,
    GetArticle
} = require('../controllers/articles') // get the function that we will use
router.route('/').get(GetAllArticles).post(AddArticle)// the route and the function that will be executed
router.route('/:id').put(IncWatched).get(GetArticle)// the route and the function that will be executed

module.exports = router //export the router 