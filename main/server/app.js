const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('../auth/Google/User')

app.use(bodyParser.json())


const mongoUri = "mongodb+srv://eya:fccyuKApEx9uFcOF@cluster0.corvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongo ")
})
mongoose.connection.on("error",(err)=>{
    console.log("error",err)
})
app.get('/',( req ,res )=>{
     res.send("welcome to node.js")
     })

     
app.listen(3000,()=>{
    console.log("server running")
})