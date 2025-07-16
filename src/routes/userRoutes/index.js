const express = require('express')
const route = express.Router()
const { createUser, loginUser } = require('../../controllers/userController/userController')

route.post('/register', createUser)
route.post('/login', loginUser)
const UserRoute = route
module.exports = UserRoute