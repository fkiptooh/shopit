const express = require('express')

const router = express.Router();

const { getProducts, 
        newProduct, 
        getSingleProduct, 
        updateProduct,
        deleteProduct,
        createOrUpdateProductReview
 } = require('../controllers/productController');

 const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')

// router.route('/products').get(getProducts);

router.get("/products", getProducts);
router.post("/product/new", isAuthenticatedUser, authorizedRoles('admin'), newProduct);
// router.get('/product/:id', getSingleProduct)
router.route('/product/:id').get(getSingleProduct);
// router.put('/admin/product/:id', updateProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
                                  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);
router.put(`/review`, isAuthenticatedUser, createOrUpdateProductReview);


module.exports = router;