const express = require('express')
const router = express.Router()

const { newOrder, myOrders, getSingleOrder, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/admin/orders',isAuthenticatedUser, authorizedRoles('admin'), allOrders)
// router.put('/admin/order/:id',isAuthenticatedUser, authorizedRoles('admin'), updateOrder);
// router.delete('/admin/order/:id', isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);
router.route(`/admin/order/:id`)
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);

module.exports = router;