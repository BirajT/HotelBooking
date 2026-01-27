import mongoose from "mongoose";
import { ROOM } from "../constants/enums.constants.js";

const roomSchema=new mongoose.Schema({
    room_type:{
        type:String,
        enum:Object.values(ROOM),
        default:ROOM.DOUBLE
    },
    room_no:{
        type:Number,
        required:true
    },
    room_price:{
        type:Number,
        default:3000
    },
    description:{
        type:String,
    },
    room_images:{
        type:{
            path:String,
            public_id:String
        }
    },
    floor:{
        type:Number
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotel",
        required:true
    }

},{timestamps:true})

const Room=mongoose.model('room',roomSchema)
export default Room

