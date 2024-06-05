const mongoose = require("mongoose");

const profileSchema=new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    about:{
        type:String,
    },
    college:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true
    },
    skills:{
        type:String,
    }
                  

})

const  profiledb=new mongoose.model("profile", profileSchema);

module.exports = profiledb;