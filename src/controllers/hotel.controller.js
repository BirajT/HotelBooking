import CustomError from "../middlewares/error_handler.middleware";
import { asyncHandler } from "../utils/asynchandler.utils";

 const dir='/hotels'
export const getAll=asyncHandler(async(req,res)=>{
  const {query,
        page=1,
        limit=10,
        minPrice,
        maxPrice}=req.query

        const currentPage=Number(page)
        const perPageLimit=Number(limit)
        const skip=(currentPage-1)*perPageLimit

        let filter={}

        if(query){
          filter.$or=[
            {
              name:{
                $regex:query,
                $options:'i',
              }},
              {address:{
                $regex:query,
                $options:'i',
              }},
          ]
        }
        if(minPrice || maxPrice){
          filter.price_per_hour={}
          if(minPrice) filter.price_per_hour.$gte=minPrice
          if(maxPrice) filter.price_per_hour.$lte=maxPrice

          const hotels=await Hotel.find(filter).sort({createdAt:-1}.skip(skip).limit(perPageLimit))
        }

        const total_count=await Hotel.countDocuments(filter)
        const pagination=getPagination(total_counts,currentPage,perPageLimit)

        res.status(201).json({
          meassage:"Hotel fetched",
          status:"success",
          data:hotels,pagination

          });
        })

        export const getByID=asyncHandler(async(req,res)=>{
          const {id}=req.params
          const hotel=await Hotel.findOne({_id:id})
          if(!hotel)
          {
            throw new CustomError("Hotel not found",400)
          }

          res.status(201).json({
            message:"hotel fetched",
            status:"success",
            data:hotel
          })
        })

        export const create=asyncHandler(async(req,res)=>{
          const {name,location,rooms,hotel_images,phone}=req.body
          const file=req.file;
           if(!file){
        throw new CustomError('image is required',400)
    }
    const hotel=new Hotel({name,location,rooms,hotel_images,phone})

    const { path, public_id } = await uploadToCloud(file.path,dir);
    await hotel.save()
    res.status(201).json({
            message:"hotel fetched",
            status:"success",
            data:hotel
          })
        })

         
      export const update=asyncHandler(async(req,res)=>{
        const {name,location,rooms,hotel_images,phone}=req.body
        const {id}=req.params
        const hotel=await findOne({id:_id})
        const file=req.params

        if(name) hotel.name=name;
        if(location) hotel.location=location;
        if(rooms) hotel.rooms=rooms;
        if(phone) hotel.phone=phone

        if(file){
          const {path,public_id}=await uploadToCloud(file.path,dir)
        if(hotel.hotel_images){
          await deleteFile(hotel.hotel_images?.public_id)
        }
        hotel.hotel_images={
          path,
          public_id
        }
      }
          await hotel.save()

         res.status(200).json({
    message: "hotel updated",
    status: "success",
    data: hotel
})
      })


      export const remove=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const hotel=await Hotel.findOne({_id:id})

    if(!hotel){
        throw new CustomError("Hotel not found",404)
    }

    if(hotel.hotel_image)
    {
         await deleteFile(hotel.hotel_image?.public_id)
    }
    await hotel.deleteOne()

    res.status(200).json({
        message:"Hotel deleted",
        status:"success",
        data:null
    })
})