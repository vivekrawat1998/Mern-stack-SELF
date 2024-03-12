const mongoose = require("mongoose")
const validator = require("validator")
const UserSchema = new mongoose.Schema  ({

    name:{
        type: String,
        required: true,
        maxLength:[30, "name cannot exceed 30 characters"],
        minLength:[10, "Name should have more then 10 charaa"]
    },
    email:{
        type: String,
        required: true,
        unique:true,
        validate:[validator.isEmail, "please enter a valid email"]
    },
    password:{
        type:String,
        required:[true, "please enter the password"],
    },
    role:{
        type:String,
        default:"user"
    }
})


module.exports= mongoose.model("User",UserSchema)