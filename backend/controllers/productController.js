const Product = require('../models/product')
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../util/apiFeatures');
const product = require('../models/product');

// create ne product => /api/v1/product/new;
exports.newProduct = catchAsyncErrors(async(req, res, next) => {
    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

}
)
// get all products controller.
exports.getProducts = catchAsyncErrors(async(req, res, next)=> {

    const resPerPage = 4;

    const productsCount = await Product.countDocuments()

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
                            .search()
                            .filter()
                            .pagination(resPerPage);

    // const products = await Product.find();
    const products = await apiFeatures.query;
    
    setTimeout(()=>{
        res.status(200).json({
            success: true,
            // count: products.length,
            productsCount,
            products
        })
    }, 2000)
})

// get single product => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const { id: productId } = req.params;
    const product = await Product.findById(productId).exec().catch((err)=>{console.log(err)})
      
    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})
// update products /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next)=> {
    const { id: productId} = req.params;
    
    // finding the product by id after destructuring the id from the requiest params
    let product = await Product.findById(productId).exec().catch((err)=>{console.log(err)});

    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    // updating the product if found.

    product  = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

// delete product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async (req,res,next)=> {
    const {id: productId} = req.params;

    let product = await Product.findById(productId).exec().catch((err)=>{console.log(err)})
    
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    // await product.remove();
    await Product.findByIdAndDelete(product);

    res.status(200).json({
        success: true,
        message: `Product with ${productId} has been deleted`
    })
})

// Product review
exports.createOrUpdateProductReview = catchAsyncErrors(async(req, res, next)=>{
    const  { rating, comment , productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    // If already rated by user before;
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
        product.reviews.forEach(review =>{
            if(review.user.toString()=== req.user._id.toString()){
                review.comment = comment,
                review.rating = rating
            }
        })

    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item)=> item.rating + acc, 0)/product.reviews.length;

    await product.save({ validateBeforeSave: false})

    res.status(200).json({
        success: true
    })
})

// Getting all product reviews
exports.getProductReviews  = catchAsyncErrors(async(req, res, next)=> {
    const product = await Product.findById(req.query.id)

    if(!product){
        return next(new ErrorHandler('No product found with that id', 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete product review.
exports.deleteReview = catchAsyncErrors(async(req, res, next)=> {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review=> review._id.toString() !== req.query.id.toString());

    const ratings = product.reviews.reduce((acc, item)=> item.rating + acc, 0)/ reviews.length;

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})