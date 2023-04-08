const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../util/errorHandler')
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

// get all orders => ADMIN /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async(req, res, next)=>{
    const orders = await Order.find();
    
    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount += parseFloat(order.totalPrice);
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// update order and stock quantity =>ADMIN /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async(req, res, next)=>{
    const order= await Order.findById(req.params.id);
    
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler("The order has already been delivered", 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false})
}

// Delete order by admin
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler(`The order with id: ${req.params.id} is not found`, 404));
    }

   await Order.findOneAndDelete(order)

    res.status(200).json({
        success: true
    })
})