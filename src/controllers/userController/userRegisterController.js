const User = require('../../models/user-models')
const createUser = async (req, res) => {
    try {
        const newUser = {
            name: "Ankit",
            email: "Ankit@legend.con",
            password: "Abc@123456",
            department: "IT",
            designation: "SDE",
            image: ""

        }
        console.log(req.body)
        //const createdUser = await User.create(newUser)
        res.status(200).send({ newUser: createdUser })
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }


}
module.exports = {
    createUser
}