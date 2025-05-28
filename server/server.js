
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./route/auth.js";
import bookingRoutes from "./route/booking.js";
import listingRoutes from "./route/listing.js";
import userRoutes from "./route/user.js";



const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));



app.use("/auth",authRoutes);
app.use("/listing",listingRoutes);
app.use("/bookings",bookingRoutes);
app.use("/users",userRoutes);


const PORT=4000;

const connectDB=async ()=>{
    await  mongoose.connect(process.env.MONGODB_URL).
    then(()=>{console.log("Database connected succesfully")});

}

connectDB();


app.listen(PORT,(err)=>{
  if(!err){
    console.log(`Server has started working on http://3.6.41.162:${PORT}`);
  }  
  else{
    console.log("Error:"+err);
  }
})