const User = require('../models/user')
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../util/jwtToken');


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
    })

  sendToken(user, 200, res)
})

exports.loginUser = catchAsyncErrors(async(req, res, next)=> {
    const {email, password} = req.body;

    // checking if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password', 400));
    }
    
    // findinf user in database.
    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    // checking if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect password", 401))
    }

    // const token = await user.getJwtToken();

    // res.status(200).json({
    //     success: true,
    //     token
    // })

    sendToken(user, 200, res)

})

// /api/v1/logout
exports.logoutUser = catchAsyncErrors(async(req, res, next)=> {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "You successfully logged out."
    });
})