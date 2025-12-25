import { asyncHandler } from "../utils/asynchandler.utils";

 const dir='/hotels'
export const getAll=asyncHandler(async(req,resizeBy,next)=>{
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

        res.status(200).json({
          meassage:"Hotel fetched",
          status:"success",
          data:hotels,pagination

        });
        
})