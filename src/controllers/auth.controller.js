import { USER_ROLE } from "../constants/enums.constants";
import CustomError from "../middlewares/error_handler.middleware";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asynchandler.utils";
import { hashPassword } from "../utils/bcrypt.utils";
import { uploadToCloud } from "../utils/cloudinary.utils";
import { registerSuccessEmail } from "../utils/email.utils";
import { sendEmail } from "../utils/nodemailer.utils";

export const register=asyncHandler(async(req,res,next)=>{
    const {first_name,last_name,email,password,phone,gender}=req.body;
    const image=req.file
   if (!first_name || !last_name || !email || !password) {
    throw new CustomError("Please provide all required fields", 400);
  }
  const hashedPass=await hashPassword(password)

  const user=await User({
    first_name,
    last_name,
    email,
    password:hashedPass,
    phone,
    gender,
    role:USER_ROLE.USER

  });

  if(image){
    const {path,public_id}=await uploadToCloud(image.path,'/profile_images');
    user.profile_image={
        path,
        public_id,
    }
  }
  await sendEmail({
    to:user.email,
    subject:"Account created",
    html:registerSuccessEmail(),
  })
  await user.save()

  res.status(201).json({
    message:"Acccount Created",
    status:'success',
    data:user
  })
})