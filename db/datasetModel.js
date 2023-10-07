const {Schema,model} = require('mongoose')
const DataSetSchema = new Schema({
    title : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    dataLinks : {
        type:Array,
        required:true
    },
    datasetsDescription:{
        type:Array,
        required:true
    },
    authorImage :{
        type:String,
        required:true
    },
    authorTitle : {
        type:String,
        required:true
    },
    dateModified : {
        type:Array,
        required:true
    },
    filesNumber : {
        type:Number,
    },
    usability : {
        type:Number,
        default : 1,
    },
    category : {
        type:String,
        default : "medical"
    },
})
module.exports = model('Datasets',DataSetSchema)