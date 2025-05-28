import express from "express";
import multer from "multer";
import Listing from "../models/Listing.js"; // Ensure correct path and .js extension if using ES modules

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
      const {
      creator, category, type,streetAdress,aptSuite,
      city,province,country,guestCount,bedroomCount,
      bedCount,bathroomCount,amenities,title,
       description,price} = req.body;
      const listingPhotos = req.files;

      if (!listingPhotos || listingPhotos.length === 0) {
        return res.status(400).send("No file uploaded...");
      };
      
  
      const listingPhotoPaths = listingPhotos.map((file) => file.path);
  
      const newListing = new Listing({
        creator, category,type,streetAdress,aptSuite,
        city,province,country,guestCount,bedroomCount,
        bedCount,bathroomCount,amenities, title,
        description,price, listingPhotoPath: listingPhotoPaths
      });
  
      await newListing.save();
      res.status(200).json(newListing);
    } catch (err) {
      console.error(err);
      res.status(409).json({ message: "Failed to create listing", error: err.message });
    }
});

router.get("/",async(req,res)=>{
    const qCategory=req.query.category;

    try{
        let listings;
        if(qCategory){
            listings=await Listing.find({category:qCategory}).populate("creator");

        }
        else{
            listings=await Listing.find().populate("creator");
        };
        res.status(200).json(listings);
    }
    catch(err){
        res.status(404).json({message:"Fail to fetch messages",error:err.message});
        console.log(err);
    }
});


router.get("/:listingId",async (req,res)=>{

    try {
        const {listingId}=req.params;
        const listing=await Listing.findById(listingId).populate("creator");
        res.status(202).json(listing);

    } catch (error) {
        res.status(404).message({message:"Listing Not found"});
    }
})

export default router;


