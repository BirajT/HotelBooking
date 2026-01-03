import CustomError from "../middlewares/error_handler.middleware.js";
import { asyncHandler } from "../utils/asynchandler.utils.js";
import { sendEmail } from "../utils/nodemailer.utils.js";

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

    const booking=await Booking.findById(id)
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
    const {hotel,check_in,check_out}=req.body
    const userId=req.user.id

    if (!hotel || !check_in || !check_out) {
    throw new CustomError("All fields are required")
    }

    if (new Date(check_in) >= new Date(check_out)) {
    return res.status(400).json({
      success: false,
      message: "Check-out must be after check-in",
    });
  }

    const booking=new Booking({hotel,user:userId,check_in,check_out})

    await booking.save();

    await booking.populate("hotel").populate("user")

    

   await sendEmail({
    to: booking.user.email,
    subject: "Your hotel has been booked",
    html: `
      <h3>Booking Confirmed</h3>
      <p>Hotel: ${booking.hotel.name}</p>
      <p>Check-in: ${check_in}</p>
      <p>Check-out: ${check_out}</p>
    `,
  });

    res.status(201).json({
        meassage:"hotel booked",
        status:"success",
        data:booking
    })
})




    export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { check_in, check_out } = req.body;
  const userId = req.user.id;

  const booking = await Booking.findById(id);

  if (!booking) {
    throw new CustomError("Booking not found", 404);
  }

  if (check_in && check_out && new Date(check_in) >= new Date(check_out)) {
    throw new CustomError("Check-out must be after check-in", 400);
  }

  booking.check_in = check_in ?? booking.check_in;
  booking.check_out = check_out ?? booking.check_out;

  await booking.save();
  await booking.populate("hotel user");

  res.status(200).json({
    message: "Booking updated successfully",
    status: "success",
    data: booking,
  });
});

    export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const booking = await Booking.findById(id);

  if (!booking) {
    throw new CustomError("Booking not found", 404);
  }

  await booking.deleteOne();

  res.status(200).json({
    message: "Booking removed successfully",
    status: "success",
  });
});
