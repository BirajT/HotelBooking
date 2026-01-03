import { USER_ROLE } from "../constants/enums.constants.js";
import CustomError from "../middlewares/error_handler.middleware.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asynchandler.utils.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils.js";
import { uploadToCloud } from "../utils/cloudinary.utils.js";
import { registerSuccessEmail } from "../utils/email.utils.js";
import { generateJWTToken } from "../utils/jwt.utils.js";
import { sendEmail } from "../utils/nodemailer.utils.js";

export const register=asyncHandler(async(req,res,next)=>{
    const {first_name,last_name,phone,email,password,gender}=req.body
    const image=req.file
    if(!password)
    {
        throw new CustomError("Password is required",400)
    }
    const hashedPass=await hashPassword(password)

    const user=new User({
        first_name,
        last_name,
        phone,
        email,
        password:hashedPass,
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
        html:registerSuccessEmail
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

    const user=await User.findOne({email})
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

export const logout = asyncHandler(async (req, res) => {
  
  res.clearCookie('access_token', {
     httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'development' ? false : true, 
  })
  res.status(200).json({
    message: 'Logged out successfully!!',
    status: 'success',
    data:null
  })
})


export const update=asyncHandler(async(req,res,next)=>{
    const {email,oldpassword,newpassword}=req.body
    if(!email || !oldpassword || newpassword)
    {
        throw new CustomError("fill all the data",400)
    }
    const user=await User.findOne({email})
    if(!user)
    {
        throw new CustomError("user not found",404)
    }

    const isMatch=await comparePassword(oldpassword,user.password)
    if(!isMatch)
    {
       throw new CustomError("Password does not match",400)
    }

    user.password=await hashPassword(newpassword)
    await user.save();

    await sendEmail({
        to:user.email,
        subject:'password updated',
        html:'password updated Successfully'
    })

    res.status(200).json({
        message:"password updated",
        status:'success',
        data:user

    })

})

export const forgotPassword=asyncHandler(async(req,res,next)=>{
    const {email,newpassword}=req.body
})