import mongoose from "mongoose";
import { BOOKING_STATUS } from "../constants/enums.constants.js";

const bookingSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotel",
        required:true
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"room",
        required:false
    },
    check_in:{
        type:Date,
        required:true,
    },
    check_out:{
        type:Date,
        required:true
    },
    booking_Status:{
        type:String,
        enum:Object.values(BOOKING_STATUS),
        default:BOOKING_STATUS.PENDING
    }

},{timestamps:true})

const Booking=mongoose.model('booking',bookingSchema)
export default Booking