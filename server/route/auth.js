import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});

const upload = multer({storage});

router.post("/register", upload.single("profileImage"), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const profileImage = req.file;

        if (!profileImage) {
            return res.status(400).json({ message: "No file uploaded!" });
        }

        const profileImagePath = profileImage.path;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath
        });

        await newUser.save();
        res.status(201).json({ message: "User Registered successfully", user: newUser });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "User Registration failed", error: error.message });
    }
});



router.post("/login",async (req,res)=>{

    try {  
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist!"});
        }   

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials..."});

        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        return  res.status(200).json({token,user});
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err.message});

        
    }

})

export default router;



