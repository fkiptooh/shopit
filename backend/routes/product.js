const express = require('express')

const router = express.Router();

const { getProducts, 
        newProduct, 
        getSingleProduct, 
        updateProduct,
        deleteProduct
 } = require('../controllers/productController');

 const { isAuthenticatedUser } = require('../middlewares/auth')

// router.route('/products').get(getProducts);

router.get("/products", getProducts);
router.post("/product/new", isAuthenticatedUser, newProduct);
// router.get('/product/:id', getSingleProduct)
router.route('/product/:id').get(getSingleProduct);
// router.put('/admin/product/:id', updateProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, updateProduct)
                                  .delete(isAuthenticatedUser, deleteProduct);


module.exports = router;