const User = require('../../models/user-models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
    try {

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin ? 1 : 0
        }
        const salt = await bcrypt.genSalt(0, 12)
        const hasedPassword = await bcrypt.hash(newUser.password, salt)
        //replaced
        if (!hasedPassword) {
            return
        }
        newUser.password = hasedPassword
        newUser.Salt = salt

        const createdUser = await User.create(newUser)
        res.status(200).send({ newUser: createdUser })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }


}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ msg: "Please enter email and password" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({
            msg: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });

        console.log("jiiijiij")

    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
}