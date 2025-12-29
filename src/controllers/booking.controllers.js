import { asyncHandler } from "../utils/asynchandler.utils";

export const getAll=asyncHandler(async(req,res)=>{
    const bookings=await Booking.find({})
    .populate("hotel")
    .populate("user")
    res.status(200).json({
        message:"Booking fetched",
        status:"success",
        data:bookings
    })

})

export const getById=asyncHandler(async(req,res)=>{
    const {id}=req.params

    const booking=await Booking.findOne({_id:id})
    .populate("hotel")
    .populate("user")

    if(!booking)
    {
        throw new CustomError("Booking not found",404)
    }
    res.status(200).json({
        message:"Booking fetched",
        status:"success",
        data:booking
    })
})

export const create=asyncHandler(async(req,res)=>{
    const {hotel,user,check}=req.body
})