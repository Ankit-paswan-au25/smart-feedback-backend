const Request = require("../../models/issueModel/issue-model")

const getAllRequest = async (req, res) => {
    try {
        const allRequest = await Request.findAll()
        res.status(200).send({
            AllRequest: allRequest
        })

    } catch (error) {
        res.status(400).send(error)
    }

}
const getSingleRequest = async (req, res) => {
    try {
        const id = req.params.id
        const singleRequest = await Request.findById(id)

        res.status(200).send({
            singleRequest
        })
    } catch (error) {
        res.status(400).send(error)
    }
}
const createRequest = async (req, res) => {
    try {
        console.log('testing')
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
    } catch (error) {
        res.status(400).send(error)
    }

}
const updateRequest = async (req, res) => {
    try {
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

    } catch (error) {
        res.status(400).send(error)
    }
}
const deleteSingleRequest = async (req, res) => {
    try {
        const id = req.params.id
        const newDeleteRequest = {
            isDeleted: true
        }
        const deleteRequest = await Request.updateById(id, newDeleteRequest)
        res.status(200).send({
            deleteRequest
        })

    } catch (error) {
        res.status(400).send(error)
    }
}
const deleteRequest = async (req, res) => {
    try {
        const id = req.user.companyId
        const newDeleteRequest = {
            isDeleted: true
        }
        const deleteRequest = await Request.updateById(id, newDeleteRequest)
        res.status(200).send({
            deleteRequest
        })

    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    getAllRequest,
    getSingleRequest,
    createRequest,
    updateRequest,
    deleteSingleRequest,
    deleteRequest
}