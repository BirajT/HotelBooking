import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    rooms:{
        type:Number,
        required:true,
    },
    hotel_images:{
        type:String,
        required:true
    },
    phone:{
        type:String
    } 
},{timestamps:true})

const Hotel=mongoose.model('hotel',hotelSchema)
export default Hotel