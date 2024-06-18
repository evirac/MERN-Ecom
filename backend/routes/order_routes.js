const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// Place order
router.post('/order', authMiddleware, async (req, res) => {
    try {
        const { cart, shippingAddress, paymentMethod, totalPrice } = req.body;
        const userId = req.userId;

        const order = new Order({
            userId,
            cart,
            shippingAddress,
            paymentMethod,
            totalPrice
        });

        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
