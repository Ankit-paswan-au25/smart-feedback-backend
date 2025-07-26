const Request = require("../../models/issueModel/issue-model")
const asyncErrorHandler = require('../../utils/catchAsync')

const getAllRequest = asyncErrorHandler(async (req, res, next) => {
    const allRequest = await Request.findAll()
    res.status(200).send({
        AllRequest: allRequest
    })

})

const getSingleRequest = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id
    const singleRequest = await Request.findById(id)
    if (!singleRequest) {
        return next('Nothing Found', 404)
    }

    res.status(200).send({
        singleRequest
    })
})

const createRequest = asyncErrorHandler(async (req, res, next) => {
    const newRequest = {
        requestType: req.body.type,
        requestCompanyId: "testingCompany",
        requestTitle: req.body.title,
        requestDescription: req.body.description,
        requestAssignTo: req.body.assignTo,
        requestPriorityType: req.body.priority,
        requestAssignBy: req.body.assignBy,
        requestAttachment: 'httplurl'//req.body.attachment
    }
    const createNewRequest = await Request.create(newRequest)

    res.status(200).send({
        createNewRequest
    })

})


const updateRequest = asyncErrorHandler(async (req, res, next) => {
    const Id = req.params.id
    const updateRequest = {
        requestType: req.body.type,
        requestTitle: req.body.title,
        requestDescription: req.body.description,
        requestAssignTo: req.body.assignTo,
        requestPriorityType: req.body.priority,
        requestAssignBy: req.body.assignBy,
        requestAttachment: req.body.attachment
    }
    const updatedRequest = await Request.updateById(Id, updateRequest)
    res.status(200).send({
        updatedRequest
    })
})


const deleteSingleRequest = asyncErrorHandler(async (req, res, next) => {
    const id = req.params.id
    const newDeleteRequest = {
        isDeleted: true
    }
    const deleteRequest = await Request.updateById(id, newDeleteRequest)
    res.status(200).send({
        deleteRequest
    })
});

const deleteRequest = asyncErrorHandler(async (req, res, next) => {
    const id = req.user.companyId
    const newDeleteRequest = {
        isDeleted: true
    }
    const deleteRequest = await Request.updateById(id, newDeleteRequest)
    res.status(200).send({
        deleteRequest
    })
});

module.exports = {
    getAllRequest,
    getSingleRequest,
    createRequest,
    updateRequest,
    deleteSingleRequest,
    deleteRequest
}