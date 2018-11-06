/** @format */

// IMPORTING EXPRESS .....
const express = require('express')
const app = express()

// IMPORTING THE BODY-PARSER
const body_parser = require('body-parser')
app.use(
  body_parser.urlencoded({
    extended: false,
  }),
)
app.use(body_parser.json())

//USING MORGAN
const morgan = require('morgan')
app.use(morgan('dev'))

// CONNECTING TO THE MONGODB WITH MONGOOSE
const mongoose = require('mongoose')
const link = require('./config/index')
mongoose.connect(
  link.database_link,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('connected to the database ....')
  },
)

//PASSPORT AUTHENTICATION 
const passport = require('passport');
app.use(passport.initialize());

// PASSPORT CONFIG FILE 
require('./config/passport')(passport)

// ..... ROUTERS ....

// USER ROUTE
const user_route = require('./routers/api/user')
app.use('/api/user', user_route)

// PROFILE ROUTE
const profile_route = require('./routers/api/profile')
app.use('/api/profile', profile_route)

// POST ROUTE
const post_route = require('./routers/api/post')
app.use('/api/post', post_route)

// CREATING THE SERVER
const port = process.env.PORT || 4444
app.listen(port, () => {
  console.log(`Listening to  ${port} .....`)
})
