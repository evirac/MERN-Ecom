const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config') 

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

module.exports = authMiddleware