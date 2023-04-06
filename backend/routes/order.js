const express = require('express')
const router = express.Router()

const { newOrder, myOrders, getSingleOrder, allOrders, updateOrder } = require('../controllers/orderController');

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/admin/orders', allOrders, isAuthenticatedUser, authorizedRoles('admin'))
router.put('/admin/order/:id', updateOrder, isAuthenticatedUser, authorizedRoles('admin'));

module.exports = router;