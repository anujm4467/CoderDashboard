/** @format */

const express = require('express')
const route = express.Router()
const User = require('../../models/User')
const gravtar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../../config/index')
const passport = require('passport')

// @ ROUTE GET /api/user/test
// @ DESC      test user route
// @ ACCESS    public

route.get('/test', (req, res) => {
  res.json({
    msg: 'hii i am user',
  })
})

// @ ROUTE POST /api/user/register
// @ DESC       save to database
// @ ACCESS     public
route.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then(userEmail => {
    if (userEmail) {
      res.status(400).json({
        email: 'Email is already exist !!!',
      })
    } else {
      const avatar = gravtar.url(req.body.email, {
        s: '200', //SIZE
        r: 'pg', //RATING
        d: 'mm', //DEFUALT
      })

      const newUser = User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(userSave => {
              res.json(userSave)
            })
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// @ ROUTE POST /api/user/login
// @ DESC       save to database
// @ ACCESS     public

route.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({
    email,
  }).then(user => {
    if (!user) {
      return res.status(400).json({
        email: 'user not found',
      })
    }
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        jwt.sign(
          payload,
          key.secrate_key,
          {
            expiresIn: 3600,
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            })
          },
        )
      } else {
        return res.status(400).json({
          password: 'incorrect password',
        })
      }
    })
  })
})

// @ ROUTE POST /api/user/current_user
// @ DESC       know current user
// @ ACCESS     private

route.get('/current_user', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
  })
})

module.exports = route
