import { asyncHandler } from "../utils/asynchandler.utils";

export const getAll=asyncHandler(async(req,resizeBy,next)=>{
    