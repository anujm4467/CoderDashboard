/** @format */
// User Route

// Load input validation
const validatorRegisterInput = require("../../validations/register");
const validatorLoginInput = require("../../validations/login");

// Libraries
const jwt = require("jsonwebtoken");
const gravtar = require("gravatar");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// express server
const express = require("express");
const route = express.Router();

// User Model Schema
const User = require("../../models/User");

// config file
const key = require("../../config/index");

// @ ROUTE GET /api/user/test
// @ DESC      test user route
// @ ACCESS    public

route.get("/test", (req, res) => {
  res.json({
    msg: "hii i am user"
  });
});

// @ ROUTE POST /api/user/register
// @ DESC       save to database
// @ ACCESS     public

route.post("/register", (req, res) => {
  const { errors, isValid } = validatorRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  // checking wheather user already exist or not
  User.findOne({
    email: req.body.email
  }).then(userEmail => {
    if (userEmail) {
      errors.email = "Email is already exist !!!";
      res.status(400).json({
        email: errors
      });
    } else {
      const avatar = gravtar.url(req.body.email, {
        s: "200", //SIZE
        r: "pg", //RATING
        d: "mm" //DEFUALT
      });

      const newUser = User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // Decrypting the password using bcryptjs
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(userSave => {
              res.json(userSave);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @ ROUTE POST /api/user/login
// @ DESC       save to database
// @ ACCESS     public

route.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = validatorLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = "user not found";
      return res.status(400).json({
        email: errors
      });
    }
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    };
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        jwt.sign(
          payload,
          key.secrate_key,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.passport = "incorrect password";
        return res.status(400).json({
          password: errors
        });
      }
    });
  });
});

// @ ROUTE POST /api/user/current_user
// @ DESC       know current user
// @ ACCESS     private

route.get(
  "/current_user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name
    });
  }
);

module.exports = route;
