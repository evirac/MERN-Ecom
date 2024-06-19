const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const UserModel = require('../models/user_model');
const ProductModel = require('../models/product_model');

const router = express.Router();

// Add to cart
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.productId.equals(productId));
        if (cartItemIndex > -1) {
            user.cart[cartItemIndex].quantity += 1;
        } else {
            user.cart.push({ productId, quantity: 1 });
        }

        await user.save();
        res.send({ cart: user.cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send({ message: 'Server Error', error });
    }
});

// Update cart item quantity
router.post('/update', authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItem = user.cart.find(item => item.productId.equals(productId));
        if (cartItem) {
            cartItem.quantity = quantity;
            await user.save();
            res.send({ cart: user.cart });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).send({ message: 'Server Error', error });
    }
});

// Remove from cart
router.post('/remove', authMiddleware, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = user.cart.filter(item => !item.productId.equals(productId));
        await user.save();

        res.send({ cart: user.cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).send({ message: 'Server Error', error });
    }
});

// Clear cart
router.post('/clear', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = [];
        await user.save();

        res.send({ cart: user.cart });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).send({ message: 'Server Error', error });
    }
});

// Get cart
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).populate('cart.productId');
        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
    }
});

// Save cart
router.post('/', authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        user.cart = req.body.cart;
        await user.save();
        res.json({ message: 'Cart saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving cart' });
    }
});

module.exports = router;
