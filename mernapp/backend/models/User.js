//how to create schema
const mongoose = require('mongoose')

const {Schema} = mongoose;

//create schema for users while signup in react
// create object in schema--UserSchema
const UserSchema = new Schema({
//iss object ke andar hamari jitni bhi details h wo dalenge
name:{
    type: String,
    required:true
},
location:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
},
});

//ab ye jo schema banaya h usko export krna taki isko baad me import krke use kr sake
module.exports = mongoose.model('user',UserSchema)