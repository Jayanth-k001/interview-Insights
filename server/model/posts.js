const mongoose = require("mongoose");

const posts=new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    company:{
        type: String,
        required: true,
    },
    experience:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true
    }  ,
    name:{
        type:String,
        required:true
    }          

})

const postsdb=new mongoose.model("allposts",posts);
 module.exports= postsdb;