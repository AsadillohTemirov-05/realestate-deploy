import express from "express";
import Booking from "../models/Booking.js";

const router=express.Router();

 router.post("/create", async (req,res)=>{

    try {
        const {customerId,hostId,
            listingId,startDate,endDate,totalPrice}=req.body;

        const newBooking=new Booking({
            customerId,hostId,listingId,
            startDate,endDate,totalPrice
        });

        await newBooking.save();
        res.status(200).json(newBooking);

    } catch (error) {
        res.status(400).json({message:"Fail to create new Booking"});

    }
 })

export default router;