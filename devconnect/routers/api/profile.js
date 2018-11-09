/** @format */

// Route profile

const express = require("express");
const route = express.Router();

// Load Validation
const validatorProfileInput = require("../../validations/profile");
const validatorExperianceInput = require('../../validations/experiance');
const validatorEducationInput = require('../../validations/eduction')

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const passport = require("passport");

// @ ROUTE GET /api/profile/handle/:handle
// @ DESC       get profile by handle
// @ ACCESS     public

route.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => console.log(err));
});

// @ ROUTE GET /api/profile/user/:user_id
// @ DESC       get profile by user id
// @ ACCESS     public

route.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({ errors: "there is no profile" }));
});

// @ ROUTE GET /api/profile/all
// @ DESC       get all profile
// @ ACCESS     public

route.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error => res.status(404).json("there is no profile"));
});

// @ ROUTE GET /api/profile/
// @ DESC       get current profile
// @ ACCESS     private

route.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => console.log(err));
});

// @ ROUTE POST /api/profile/
// @ DESC      create current user profile
// @ ACCESS     private

route.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // importing all validation
    // applying to current user
    const { errors, isValid } = validatorProfileInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // creating profile object
    const profileField = {};

    // geting current user id
    profileField.user = req.user.id;

    if (req.body.handle) {
      profileField.handle = req.body.handle;
    }
    if (req.body.company) {
      profileField.company = req.body.company;
    }
    if (req.body.website) {
      profileField.website = req.body.website;
    }

    if (req.body.location) {
      profileField.location = req.body.location;
    }
    if (req.body.bio) {
      profileField.bio = req.body.bio;
    }
    if (req.body.status) {
      profileField.status = req.body.status;
    }
    if (req.body.githubusername) {
      profileField.githubusernameon = req.body.githubusernametion;
    }
    // skill - split into array
    if (typeof req.body.skills) {
      profileField.skills = req.body.skills.split(",");
    }

    // social
    profileField.social = {};
    if (req.body.youtube) {
      profileField.social.youtube = req.body.youtube;
    }

    if (req.body.facebook) {
      profileField.social.facebook = req.body.facebook;
    }

    if (req.body.twitter) {
      profileField.social.twitter = req.body.twitter;
    }

    if (req.body.instagram) {
      profileField.social.instagram = req.body.instagram;
    }

    if (req.body.linkedin) {
      profileField.social.linkedin = req.body.linkedin;
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
      } else {
        // create
        // check if handle exist
        Profile.findOne({ handle: profileField.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "That handle is alreadt exist";
              res.status(400).json(errors);
            }
            // save profile
            new Profile(profileField).save().then(profile => res.json(profile));
          })
          .catch(error => console.log(error));
      }
    });
  }
);

// @ ROUTE POST  /api/experiance/
// @ DESC       set experiance
// @ ACCESS     private

route.post(
  "/experiance",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    // importing all validation
    // applying to current user
    const { errors, isValid } = validatorExperianceInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.experiance.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);



// @ ROUTE POST  /api/education/
// @ DESC       set education
// @ ACCESS     private

route.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    // importing all validation
    // applying to current user
    const { errors, isValid } = validatorEducationInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

module.exports = route;
