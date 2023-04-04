const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../util/apiFeatures')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// creating new order => /api/v1/order/new

exports.newOrder = catchAsyncErrors(async(req, res, next)=> {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

// get single order by id /api/v1/order/:id

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order with that Id is not found", 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

// get all orders for logged in user
exports.myOrders = catchAsyncErrors(async(req, res, next)=> {
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })
})