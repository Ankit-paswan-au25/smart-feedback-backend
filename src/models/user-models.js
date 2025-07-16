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
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;