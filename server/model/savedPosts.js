const mongoose = require("mongoose");

const savedPost=new mongoose.Schema({
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
    } ,
    name:{
        type:String,
        required:true,
    }           

})

const postSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    savedPosts: [savedPost]
})

const  savedPostdb=new mongoose.model("savedposts", postSchema);

module.exports = savedPostdb;