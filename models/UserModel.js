const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : { 
        type : String,
        required : [true, "Name is requirerd"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        uniqure  :true,
        match : [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email format"
        ]
    },
    password : {
        type : String,
        required : true,
        minlength : [10, "Password Must be at least 10 character"]
    }
}, {timestamps : true})

module.exports = mongoose.model("User", userSchema)