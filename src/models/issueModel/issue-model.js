const mongoose = require('mongoose');


const RequestSchema = mongoose.Schema({
    requestType: {
        type: String,
        required: true
    },
    requestCompanyId: {
        type: String,
        required: true
    },
    requestTitle: {
        type: String,
        required: true
    },
    requestDescription: {
        type: String,
        required: true
    },
    requestPriorityType: {
        type: String,
        required: true
    },
    requestAssignTo: {
        type: String,
        required: true
    },
    requestAssignBy: {
        type: String,
        required: true
    },
    requestAttachment: {
        type: String,
        required: true
    },
    isLocked: {
        type: Boolean,
        default: false
    },

    isDeleted: {
        type: Boolean,
        dafault: false
    }
},
    {
        timestamps: true
    }
)
const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;