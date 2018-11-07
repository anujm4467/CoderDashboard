/** @format */

// Route profile

const express = require("express");
const route = express.Router();

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const passport = require("passport");

route.get("/test", (req, res) => {
  res.json({
    msg: "hii i am in profile"
  });
});

// @ ROUTE POST /api/profile/
// @ DESC       know current user
// @ ACCESS     private

route.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => console.log(err));
});

module.exports = route;
