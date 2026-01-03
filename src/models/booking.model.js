import mongoose from "mongoose";
import { BOOKING_STATUS } from "../constants/enums.constants.js";

const bookingSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:'true'
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required:"true"
    },
    check_in:{
        type:String,
        required:true,
    },
    check_out:{
        type:String,
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