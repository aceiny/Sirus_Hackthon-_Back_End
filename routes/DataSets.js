const express = require('express')
let router = express.Router() // get the router from expresss

const {
    AddDataSet,
    GetAllDataSets,
    GetDataSet
} = require('../controllers/datasets') // get the function that we will use
router.route('/').post(AddDataSet).get(GetAllDataSets)// the route and the function that will be executed
router.route('/:id').get(GetDataSet)// the route and the function that will be executed


module.exports = router //export the router 