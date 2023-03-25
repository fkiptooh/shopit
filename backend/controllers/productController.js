const Product = require('../models/product')
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../util/apiFeatures');
const product = require('../models/product');

// create ne product => /api/v1/product/new;
exports.newProduct = catchAsyncErrors(async(req, res, next) => {
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

    const productCount = await Product.countDocuments()

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
                            .search()
                            .filter()
                            .pagination(resPerPage);

    // const products = await Product.find();
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    })
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