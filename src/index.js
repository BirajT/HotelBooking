import 'dotenv/config'
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import cookieParser from 'cookie-parser';
import hotelRoutes from "./routes/hotel.routes.js"
import { errorHandler } from "./middlewares/error_handler.middleware.js";


connectDB()
const app=express()
const PORT=process.env.PORT

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api/booking',bookingRoutes)
app.use('/api/hotel',hotelRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"server is up and running "
    });
});

// Error handler middleware (must be last)
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
});