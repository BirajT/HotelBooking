import mongoose from "mongoose";
import { ROOM } from "../constants/enums.constants";

const roomSchema=new mongoose.Schema({
    room_type:{
        type:Object.values(ROOM),
        default:ROOM.DOUBLE
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
    }



},{timestamps:true})

const Room=mongoose.model('room',roomSchema)
export default Room

