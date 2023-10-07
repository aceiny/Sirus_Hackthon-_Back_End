const Article = require('../db/ArticleModel')
const User = require('../db/user')

//get fonctions
const GetAllArticles = async(req,res) => {
    try {

        const {title,sort,limit,page} = req.query
        const QObjects = {} 
        //fill in the Queries object 
            if (title) {
                QObjects.title = {$regex : title , $options : "i"}
            }
        //end fill in the Queries object 

          let result = Article.find(QObjects)
          if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
          }else {
            result = result.sort('createdAt');
          }
          //pagination 
            const PageLimit = limit || 15
            const Page = page || 1
            const Skip = (Page - 1 ) * PageLimit 
            result = result.skip(Skip).limit(PageLimit)
          //end pagination
          const products = await result
          const NbProducts = await Article.find({})
          const Nbpages = Math.ceil(NbProducts.length/PageLimit)
          res.status(200).json({
            NbAllArticles : NbProducts.length,
            NbPages : Nbpages,
            page : Page,
            NbHits : products.length,
            Article : products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
const IncWatched = async (req,res) => {
    const {id} = req.params
    try{
        await Article.findByIdAndUpdate(id,{$inc : {watched : 1}})
        res.status(200).json({status : "watched increamaneted"})
    }catch(err){
        console.log(err)
        res.status(500).json({status : "server error" })
    }
}
const AddArticle = async(req,res) => {
    try {
        const article = await Article.create(req.body)
        res.status(200).json({status: 'article added', article})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
const GetArticle = (req,res) => {
    const {id} = req.params
    try{
        const article = Article.findById(id)
        if(article){
            return res.status(200).json({status : "article found",article})
        }
        return res.status(404).json({status : "article not found"})
    }catch(err){
        console.log(err)
        return res.status(500).json({status : "server error" })
    }
}
// to update something in all article
/*const updateQuery = { $set: { watched: 0 } }; 
const update = async () => {
    await Article.updateMany({}, updateQuery)
}
update()*/
module.exports = {
    GetAllArticles,
    AddArticle,
    GetArticle,
    IncWatched,
}