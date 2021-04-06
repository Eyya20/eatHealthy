const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    id: String,
    givenName: String,
    familyName: String,
    photo: String, // url
    name: String // full name
  })


  
  module.exports=mongoose.model("user",UserSchema)