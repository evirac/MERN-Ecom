const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user_model');

const router = express.Router();

// Secret key for JWT
const SECRET_KEY = 'secretKey';

// Register endpoint
router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ fullName, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY);
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Middleware for authenticating token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Token verification error:', error.message); // Log error details
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Verify token endpoint
router.post('/verifyToken', authMiddleware, (req, res) => {
    res.json({ valid: true });
});

// Profile endpoint
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select('-password');
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

// Update email endpoint
router.put('/updateEmail', authMiddleware, async (req, res) => {
    const { newEmail } = req.body;

    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = newEmail;
        await user.save();
        res.json({ message: 'Email updated successfully' });
    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({ error: 'Error updating email' });
    }
});

// Reset password endpoint
router.put('/resetPassword', authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Error resetting password' });
    }
});

// Get cart
router.get('/cart', authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).populate('cart.productId');
        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
    }
});

// Save cart
router.post('/cart', authMiddleware, async (req, res) => {
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
