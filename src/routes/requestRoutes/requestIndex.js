const express = require('express')
const route = express.Router()
const { getAllRequest, getSingleRequest, createRequest, updateRequest, deleteRequest, deleteSingleRequest
} = require('../../controllers/requestController/requestController')

route.get('/getAll', getAllRequest)
route.get('/getSingle/:id', getSingleRequest)
route.post('/createRequest', createRequest)
route.patch('/updateRequest/:id', updateRequest)
route.delete('/deleteSingle/:id', deleteSingleRequest)
route.delete('/deleteALL', deleteRequest)

const requestRoute = route
module.exports = requestRoute