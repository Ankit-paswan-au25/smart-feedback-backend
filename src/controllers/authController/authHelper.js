const crypto = require('crypto');
const asyncErrorHandler = require('../../utils/catchAsync')


const resetTokenGenration = asyncErrorHandler(async () => {
    const resetToken = crypto.randomBytes(32).toString('hex')
    // console.log(resetToken, "hlepr")
    // const finalToken = await crypto.createHash('sha256').update(resetToken).digest('hex')
    // console.log(finalToken, "lllllllllllll")
    return crypto.createHash('sha256').update(resetToken).digest('hex')
})

module.exports = {
    resetTokenGenration
}