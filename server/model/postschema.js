const mongoose = require("mongoose");

const post=new mongoose.Schema({
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
    }            

})

const postSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    posts: [post]
})

const  postdb=new mongoose.model("posts", postSchema);

module.exports = postdb;