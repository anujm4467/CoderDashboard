/** @format */

const express = require('express')
const route = express.Router()

route.get('/test', (req, res) => {
  res.json({
    msg: 'hii i am in profile',
  })
})

module.exports = route
