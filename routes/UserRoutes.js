const express = require('express')
let router = express.Router()
const {
    decodeToken,
} = require('../controllers/auth')

const {
    AddToFavs,
    GetUserData
} = require('../controllers/user')

router.route('/:id').post(decodeToken, AddToFavs)
router.route('/').get(decodeToken, GetUserData)

module.exports = router