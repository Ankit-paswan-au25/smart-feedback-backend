// const User = require('../../models/user-models')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const asyncErrorHandler = require('../../utils/catchAsync')
// const AppError = require('../../utils/appError')

// const registerUser = asyncErrorHandler(async (req, res, next) => {
//     const newUser = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         isAdmin: req.body.isAdmin ? 1 : 0
//     }
//     const salt = await bcrypt.genSalt(0, 12)
//     const hasedPassword = await bcrypt.hash(newUser.password, salt)
//     //replaced
//     if (!hasedPassword) {
//         return
//     }
//     newUser.password = hasedPassword
//     newUser.Salt = salt

//     const createdUser = await User.create(newUser)
//     res.status(200).send({ newUser: createdUser })
// })


// const loginUser = asyncErrorHandler(async (req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return next(new AppError('Please Enter Id and Password', 400))
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//         return next(new AppError(`No User Found from ${email}`, 404))
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return next(new AppError("Invalid credentials", 400))

//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).send({
//         msg: "Login successful",
//         token,
//         user: {
//             id: user._id,
//             email: user.email
//         }
//     });
// });

// module.exports = {
//     registerUser,
//     loginUser
// }