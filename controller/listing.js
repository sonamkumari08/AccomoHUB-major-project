const Listing = require("../Models/listing");




 //Index
 module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

  module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
  };
  module.exports.renderNewFarmPage = async (req, res) => {
    res.render("listings/farmPage.ejs");
  };
  
  module.exports.renderGallery = (req, res) => {
    res.render("listings/gallery.ejs");
  };
  
  module.exports.renderTranding = (req, res) => {
    res.render("listings/tranding.ejs");
  };
  
  module.exports.renderAbout = (req, res) => {
    res.render("listings/about.ejs");
  };
  module.exports.renderHome = (req, res) => {
    res.render("listings/home.ejs");
  };
  module.exports.renderTestPage = (req, res) => {
    res.render("listings/testpage.ejs");
  };
  module.exports.renderFooter = (req, res) => {
    res.render("listings/foterpage.ejs");
  };
  
  module.exports.renderIconPage = (req, res) => {
    res.render("listings/iconPage.ejs");
  };
  module.exports.renderStay = (req, res) => {
    res.render("listings/stay.ejs");
  };

  module.exports.showListing = async  (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate ({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
    if(!listing) {
      req.flash("error", " Listing you requested for not exist!");
      res.redirect("/listing");
    }
    res.render("listings/show.ejs", { listing });
  };
  module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing is created!");
    res.redirect("/listings");
  };
  module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
      req.flash("error", "Listing is Edited");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  };
  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
   let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   if( typeof req.file !== "undefined"){
   let url = req.file.path;
   let filename = req.file.filename;
   Listing.image = {url, filename};
    await listing.save();
   }
   req.flash("success", " Listing Updated!");
    res.redirect(`/listings/${id}`);
  };
  module.exports.distroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "New Listing deleted!");
    res.redirect("/listings");
  };