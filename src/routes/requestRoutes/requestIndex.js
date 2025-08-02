const express = require('express')
const route = express.Router()
const auth = require('../../controllers/authController/authController')
const { getAllRequest, getSingleRequest, createRequest, updateRequest, deleteRequest, deleteSingleRequest
} = require('../../controllers/requestController/requestController')

route.get('/getAll', auth.routeProtector, getAllRequest)
route.get('/getSingle/:id', auth.routeProtector, getSingleRequest)
route.post('/createRequest', auth.routeProtector, createRequest)
route.patch('/updateRequest/:id', auth.routeProtector, updateRequest)
route.delete('/deleteSingle/:id', auth.routeProtector, deleteSingleRequest)
route.delete('/deleteALL', auth.routeProtector, deleteRequest)

const requestRoute = route
module.exports = requestRoute