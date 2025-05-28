import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Listing from "../models/Listing.js"; // ✅ Add this line

const router = express.Router();

router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;

    const trips = await Booking.find({ customerId: userId })
      .populate("customerId")
      .populate("hostId")
      .populate("listingId");

    res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cannot find trips", error: error.message });
  }
});

router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;

    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");
    if (!user || !listing) {
      return res.status(404).json({ message: "User or Listing not found" });
    }

    const favouriteListing = user.wishList.find((item) => item._id.toString() === listingId);

    if (favouriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId); // ✅ Fixed .toString !== listingId
      await user.save();
      res.status(200).json({ message: "Listing removed from WishList", wishList: user.wishList });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({ message: "Listing is added to Wishlist", wishList: user.wishList });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message }); // 500 is better for server errors
  }
});




router.get("/:userId/listing", async (req, res) => {
  try {
    const { userId } = req.params;

    const listing = await Booking.find({ creator: userId })
      .populate("creator");

    
    res.status(200).json(listing);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cannot find listing", error: error.message });
  }
});

export default router;

