const Product = require('../models/product')


// create ne product => /api/v1/product/new;
exports.newProduct = async(req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

}

// get all products controller.
exports.getProducts = async(req, res, next)=> {
    
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}

// get single product => /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    const { id: productId } = req.params;
    const product = await Product.findById(productId).exec().catch((err) => {
        console.log(err);
      });
      
    if(!product){
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    res.status(200).json({
        success: true,
        product
    })
};

  