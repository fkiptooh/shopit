const User = require('../models/user')
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../util/jwtToken');
const sendEmail = require('../util/sendEmail');


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

// forgot password /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next)=> {
    // finding user
    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler("User with this email is not found", 404));
    }

    // get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // create a reset url
    const resetUrl = `${req.protocal}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your reset password token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: "ShopIt Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email send to: ${user.email}`
        })
        
    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
        
    }
})