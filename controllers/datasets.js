const DataSet = require('../db/datasetModel')
const User = require('../db/user')

const AddDataSet = async(req,res) => {
    try {
        const dataset = await DataSet.create(req.body)
        res.status(200).json({status: 'dataset added', dataset})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
const GetAllDataSets = async (req,res) => {
    try{
        const {title,sort,limit,page} = req.query
        const QObjects = {}
        if (title) {
            QObjects.title = {$regex : title , $options : "i"}
        }
        let result = DataSet.find(QObjects)
        if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        }
        const PageLimit = limit || 15
        const Page = page || 1
        const Skip = (Page - 1 ) * PageLimit
        result = result.skip(Skip).limit(PageLimit)
        const datasets = await result
        const Nbdatasets = await DataSet.find({})
        const Nbpages = Math.ceil(Nbdatasets.length/PageLimit)
        res.status(200).json({
            NbAlldatasets : Nbdatasets.length,
            NbPages : Nbpages,
            page : Page,
            NbHits : datasets.length,
            datasets : datasets,
        })
    }catch(err){

    }
}
const GetDataSet = async(req,res) => {
    const {id} = req.params
    try {
        console.log(id)
        const Dataset = await DataSet.findById(id)
        console.log(Dataset)
        if(!Dataset) {
            return res.status(404).json({status: 'dataset not found'})
        }
        res.status(200).json({status: 'dataset found', Dataset})
    } catch (err) {
        console.log(err)
        res.status(500).json({status: 'server error'})
    }
}
/*const updateQuery = { $set: { category : "water" } }; 
const update = async () => {
    await DataSet.updateMany({}, updateQuery)
}*/
//update()
module.exports = {
    AddDataSet,
    GetAllDataSets,
    GetDataSet
}