const User = require('../../models/user-models')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const bcrypt = require('bcryptjs')
const asyncErrorHandler = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')
const authHelper = require('./authHelper')
const crypto = require('crypto')


const registerUser = asyncErrorHandler(async (req, res, next) => {
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
})


const loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please Enter Id and Password', 400))
    }

    const user = await User.findOne({ email }).select('+password');



    if (!user) {

        return next(new AppError(`No User Found from with ${email} `, 404))
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError("Invalid credentials", 400))

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
});

const routeProtector = asyncErrorHandler(async (req, res, next) => {
    //1: checking header or token  exist or not 
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {

        return next(new AppError('You are not logged in .Please login first', 401))
    }

    //2: verifying token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    //3: checking if user status 
    const currentUser = await User.findOne({ _id: decoded.userId })

    if (!currentUser) {
        return next(new AppError('The token belongs to this user, no longer exist', 401))
    }
    req.user = currentUser
    next()
})

const forgotPassword = asyncErrorHandler(async (req, res, next) => {
    // check user exist or not
    const email = req.body.email
    const isUser = await User.findOne({ email: email })
    if (!isUser) {
        return next(new AppError('User not found', 404))
    }
    console.log("ss")
    const resetToken = crypto.randomBytes(32).toString('hex')
    let token = await crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log(token)
    // generating token and saving it into DB
    const resetPassword = {
        passwordChangeAt: Date.now(),
        passwordResetToken: token,
        passwordResetTokeExpiresIn: Date.now() + 10 * 60 * 1000 //10minute
    }
    const updateDbToken = await User.findOneAndUpdate({ email }, resetPassword, { new: true })

    //sending same token in mail

    res.status(200).send({
        token,
        updateDbToken
    })

})

const resetPassword = asyncErrorHandler(async (req, res, next) => {
    //confirming email exist or not
    const email = req.body.email

    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    if (password !== confirmPassword) {
        return next(new AppError('Password not match', 401))
    }

    const userEmail = await User.findOne({ email })
    if (!userEmail) {
        return next(new AppError('User not exist', 404))
    }

    //matching token and checking token expired or not
    const token = req.params.token
    if (userEmail.passwordResetToken !== token || userEmail.passwordResetTokeExpiresIn > Date.now()) {
        return next(new AppError('Authentication failed Please reset your Password Again', 401))
    }

    //saving password



    const salt = await bcrypt.genSalt(0, 12)
    const hasedPassword = await bcrypt.hash(password, salt)
    //replaced
    if (!hasedPassword) {
        return next(new AppError('Technical error please try again later', 500))
    }
    newUser.password = hasedPassword
    newUser.Salt = salt

    const resetPassword = {
        password: password,
        Salt: Salt,
        passwordChangeAt: undefined,
        passwordResetToken: undefined,
        passwordResetTokeExpiresIn: undefined //10minute
    }
    await User.findOneAndUpdate({ email }, resetPassword, { new: true })

    res.status(200).send({
        status: "success",
        message: "Password Reset successfully",
    })

})



module.exports = {
    registerUser,
    loginUser,
    routeProtector,
    resetPassword,
    forgotPassword
}