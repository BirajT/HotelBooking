import { USER_ROLE } from "../constants/enums.constants";
import CustomError from "../middlewares/error_handler.middleware";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asynchandler.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { uploadToCloud } from "../utils/cloudinary.utils";
import { registerSuccessEmail } from "../utils/email.utils";
import { generateJWTToken } from "../utils/jwt.utils";
import { sendEmail } from "../utils/nodemailer.utils";

export const register=asyncHandler(async(req,res,next)=>{
    const {first_name,last_name,phone,email,password,gender}=req.body
    const image=req.file
    if(!password)
    {
        throw new CustomError("Password is required",400)
    }
    const hashedPass=new hashPassword(password)

    const user=await User({
        first_name,
        last_name,
        phone,
        email,
        password,
        gender,
        role:USER_ROLE.USER
    })

    if(image)
    {
        const {path,public_id}=await uploadToCloud(image.path,"/profile_images")

        user.profile_image={
            path,
            public_id
        }
    }
    await sendEmail({
        to:user.email,
        subject:"Acccount created",
        htmil:registerSuccessEmail
    })

    await user.save()

    res.status(200).json({
        message:"Account Created Successfully",
        status:"success",
        data:user
        
    });
})

export const login=asyncHandler(async(req,res,next)=>{
    const{email,password}=req.body
    if(!email)
    {
        throw new CustomError("Email is required",400)
    }
    if(!password)
    {
        throw new CustomError("Password is required",400)
    }

    const user=await USER.findOne({email})
    if(!user)
    {
        throw new CustomError("User not found",400)
    }
    const isMatch=await comparePassword(password,user.password)
    if(!isMatch)
    {
        throw new CustomError("Password doesnot match")
    }
    await sendEmail({
        to:user.email,
        subject:"Login Success",
        html:'<h1>New Login</h1>'
    })

    const access_token=generateJWTToken({
        _id:user._id,
        email:user.email,
        first_name:user.first_name,
        last_name:user.last_name,
        role:user.role
    })
res.cookie('access_token', access_token, {
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'development' ? false : true,
    maxAge: parseInt(process.env.COOKIE_EXPIRY || '7') * 24 * 60 * 60 * 1000
  }). res.status(200).json({
        message:"Login Success",
        status:"success",
        data:user,
        access_token

    })

})