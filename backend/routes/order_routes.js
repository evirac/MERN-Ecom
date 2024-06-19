const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/order_model'); 

// Place order
router.post('/', authMiddleware, async (req, res) => {
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

// Get order history
router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).populate('cart.productId'); // Correct the model name
        res.json(orders);
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ error: 'Error fetching order history' });
    }
});

// Get order details
router.get('/:orderId', authMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('cart.productId'); // Correct the model name
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ error: 'Error fetching order details' });
    }
});

module.exports = router;
