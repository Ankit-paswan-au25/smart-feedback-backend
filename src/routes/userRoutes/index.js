const express = require('express')
const route = express.Router()
const { registerUser, loginUser } = require('../../controllers/userController/userController')

route.post('/register', registerUser)
route.post('/login', loginUser)
const UserRoute = route
module.exports = UserRoute