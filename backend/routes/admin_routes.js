const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const adminMiddleware = require('../middleware/adminMiddleware');
const UserModel = require('../models/user_model');
const AddressModel = require('../models/address_model')
const OrderModel = require('../models/order_model')
const ProductModel = require('../models/product_model')

// admin route
router.get('/', adminMiddleware, async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Get user details by ID
router.get('/:userId', adminMiddleware, async (req, res) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const addresses = await AddressModel.find({ userId });
        const orders = await OrderModel.find({ userId });

        res.json({ user, addresses, orders });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Error fetching user details' });
    }
});

// Toggle admin status
router.patch('/:userId/toggleAdmin', adminMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isAdmin = !user.isAdmin;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Error updating admin status:', error);
        res.status(500).json({ error: 'Error updating admin status' });
    }
});



// Remove a product by ID
router.delete('/:productId', adminMiddleware, async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.productId);
        res.json({ message: 'Product removed successfully' });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ error: 'Error removing product' });
    }
});

// Update a product by ID
router.put('/:productId', adminMiddleware, async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

module.exports = router;