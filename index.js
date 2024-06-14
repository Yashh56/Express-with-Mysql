const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const authRoutes = require('./route/authRoute')
const profileRoute = require('./route/profileRoute')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.json())

app.use('/auth',authRoutes)
app.use('/',profileRoute)



if(process.env.Production!="Testing"){
    app.listen(process.env.PORT,()=>{
        console.log(`Server started at ${process.env.PORT}`)
    })
}else{

    module.exports = app;
}
