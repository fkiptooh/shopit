const User = require('../models/user')
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// register user. /api/v1/register
exports.registerUser = catchAsyncErrors(async(req, res, next)=>{
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "ghgshsgs",
            url: "hdjhdhdhjd"
        }
    });
    res.status(201).json({
        success: true,
        user
    })
})