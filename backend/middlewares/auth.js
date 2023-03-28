const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next)=>{
    const { token } = req.cookies;

    // console.log(token)
    // if token does not exist
    if(!token){
        return next(new ErrorHandler('Please login to access this resource', 400))
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    // once veryfied proceed
    next()
})