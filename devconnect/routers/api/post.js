/** @format */

const express = require('express')
const route = express.Router()

route.get('/post', (req, res) => {
  res.json({
    msg: 'hii i am in post',
  })
})

module.exports = route
