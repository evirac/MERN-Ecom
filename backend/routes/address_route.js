const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Address = require('../models/Address');

// Add new address
router.post('/address', authMiddleware, async (req, res) => {
    try {
        const { fullName, address, city, postalCode, country } = req.body;
        const userId = req.userId;

        const newAddress = new Address({
            userId,
            fullName,
            address,
            city,
            postalCode,
            country
        });

        await newAddress.save();
        res.status(201).json({ message: 'Address added successfully', address: newAddress });
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Get addresses for user
router.get('/addresses', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const addresses = await Address.find({ userId });
        res.json(addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
