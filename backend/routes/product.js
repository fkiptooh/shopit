const express = require('express')

const router = express.Router();

const { getProducts, newProduct, getSingleProduct } = require('../controllers/productController');

// router.route('/products').get(getProducts);

router.get("/products", getProducts);
router.post("/product/new", newProduct);
// router.get('/product/:id', getSingleProduct)
router.route('/product/:id').get(getSingleProduct);

module.exports = router;