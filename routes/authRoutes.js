const express = require('express')
let router = express.Router()

const {
    Login,
    SignUp
} = require('../controllers/sign')

router.route('/login').post(Login)
router.route('/signup').post(SignUp)

module.exports = router