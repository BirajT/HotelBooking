import express from "express"
import 'dotenv/config'
import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import cookieParser from 'cookie-parser';
import hotelRoutes from "./routes/hotel.routes.js"
const app=express()
const PORT=process.env.PORT
connectDB()
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api/booking',bookingRoutes)
app.use('/api/hotel',hotelRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"server is up and running "
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
});