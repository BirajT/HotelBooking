import mongoose from "mongoose";
import { GENDER, USER_ROLE } from "../constants/enums.constants.js";

const userSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    phone:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:Object.values(USER_ROLE),
        default:USER_ROLE.USER
    },
    gender:{
        type:String,
        enum:Object.values(GENDER)
    },
    profile_images:{
        type:{
            path:String,
            public_id:String
        }
    }

},{timestamps:true})

const User=mongoose.model('user',userSchema)
export default User