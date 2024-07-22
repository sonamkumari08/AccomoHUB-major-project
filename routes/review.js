

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const reviewController = require("../controller/review.js");
const {isLoggedIn} = require("../middleware.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");

//Reviews
//Post Route
router.post("/",   wrapAsync( async(req, res) =>{
        console.log(req.params.id);
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        console.log()
        await newReview.save();
        await listing.save();
        req.flash("success", "New review Created!");
      res.redirect(`/listings/${listing._id}`);
      }));

 
   

module.exports = router;

