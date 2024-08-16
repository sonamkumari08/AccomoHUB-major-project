const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const session = require("express-session");
const Listing = require("../Models/listing.js");
const listingController = require("../controller/listing.js");
const {isLoggedIn , isOwner,validateListing} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router
.route("/")
 .get( wrapAsync(listingController.index))
 .post(
 isLoggedIn,   upload.single('listing[image]'),
  wrapAsync  ( listingController.createListing) ) ;

 
router.get("/new",isLoggedIn, ( listingController.renderNewForm));

router.get("/gallery", (listingController.renderGallery  ));
router.get("/farmPage", (listingController.renderNewFarmPage  ));

router.get("/tranding",(listingController.renderTranding) );
//about page
router.get("/about", (listingController.renderAbout ) );

router.get("/home", ( listingController.renderHome));

router.get("/testpage",  ( listingController.renderTestPage));

router.get("/foterpage",  (listingController.renderFooter));

router.get("/iconPage", (listingController.renderIconPage));

router.get("/stay", (listingController.renderStay));

 router.route("/:id")
 .get( wrapAsync(listingController.showListing   ))
 .put(
  isLoggedIn, isOwner,upload.single('listing[image]'), 
  wrapAsync( listingController.updateListing) )

  .delete( isLoggedIn, isOwner,
   wrapAsync (listingController.distroyListing   ));

     
//Edit Route
  router.get("/:id/edit", isLoggedIn,  isOwner, 
  wrapAsync(listingController.renderEditForm ));


  module.exports = router;