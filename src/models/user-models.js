const mongoose = require('mongoose');
const validator = require('validator');


const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"]
        },
        email: {
            type: String,
            required: [true, 'Please Provide email'],
            unique: true,
            lowerCase: true,
            validate: [validator.isEmail, 'Please provide valid email']
        },
        password: {
            type: String,
            required: [true, 'Please Provide password'],
            minlength: 8,
            select: false
        },
        passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetTokeExpiresIn: Date,
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