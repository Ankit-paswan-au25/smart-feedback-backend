const express = require('express')
const route = express.Router()
const auth = require('../../controllers/authController/authController')

route.post('/register', auth.registerUser)
route.post('/login', auth.loginUser)
route.post('/forgotPassword', auth.forgotPassword)
route.post('/resetPassword/:token', auth.resetPassword)
const UserRoute = route
module.exports = UserRoute