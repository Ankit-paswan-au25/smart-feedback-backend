const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"]
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        department: {
            type: String,
        },
        designation: {
            type: String,
        },
        image: {
            type: String
        },
        isUpdatedBy: {
            type: Number,
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
);

const User = mongoose.model("User", UserSchema);
module.exports = User;