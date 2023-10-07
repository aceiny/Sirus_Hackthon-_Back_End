//importin all requirements 
const express = require('express')
const app = express()
const connectdb = require('./db/connectdb') //db connection fonction 
const ArticleRoutes = require('./routes/ArticleRoutes') //products routes
const authRoutes = require('./routes/authRoutes') //auth routes
const userRoutes = require('./routes/UserRoutes') //user routes
const CommunityRoutes = require('./routes/CommunityRoutes') //community routes
const DataSetRoutes = require('./routes/DataSets') //dataset model
const NotFound = require('./extra/notfound') //not found handler
const errhandler = require('./extra/errhandler') //err handler
require('dotenv').config()

// midddelwares 
app.use(express.json())
app.use('/api/v1/articles',ArticleRoutes) // link the articles routes
app.use('/api/v1/datasets',DataSetRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/Community',CommunityRoutes)
//handelers
    app.use(NotFound) //handle wrong route pathes
    app.use(errhandler) //handle server errs
//start the server 
const port = process.env.PORT || 8080
const start = async () => {
    try {
        await connectdb(process.env.MONGO) // connect to db
        app.listen(port , console.log('listenin on port ' + port ))

    }catch(err) {
        console.log(err)
    }
}
start()