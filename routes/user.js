const express = require("express");
const router = express.Router();
const User  = require("../Models/users.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller = require("../controller/user.js");


   router.route("/signup")
   .get( usercontroller.renderSignupForm)
   .post(wrapAsync(usercontroller.signup ));


   router.route("/login")
   .get(usercontroller.renderLogin)
   .post(
    saveRedirectUrl,
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),
  usercontroller.login
);



router.get("/logout", usercontroller.logoutform);

module.exports = router;