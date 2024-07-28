const Listing =  require("./Models/listing");
const Review = require("./Models/review");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/expressError.js");







const validateReview = (req, res, next) => {
    let {error} =  reviewSchema.validate(req.body);
   
     if (result.error) {
       throw new ExpressError(400, error);
     } else {
      next();
     }
  };
  
const validateListing = (req, res, next) => {
    let {error} =  listingSchema.validate(req.body);
   
     if (result.error) {
      
       throw new ExpressError(400, error);
     } else {
      next();
     }
  };
module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
      }
      next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
if (req.session.redirectUrl ) {
    res.locals.redirectUrl = req.session.redirectUrl;
}
next();
};

module.exports.isOwner = async (req , res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not Owner of this listing");
        res.redirect(`/listings/${id}`);
    }
    next();
};