const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST - Adăugarea unei noi comenzi
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/last', orderController.getLastOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
