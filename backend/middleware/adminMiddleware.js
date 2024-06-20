const jwt = require('jsonwebtoken');
const UserModel = require('../models/user_model');
const { SECRET_KEY } = require('../config');

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await UserModel.findById(decoded.userId);
        if (user && user.isAdmin) {
            req.user = user;
            next();
        } else {
            res.status(403).json({ message: 'Access denied, admin only' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Auth failed' });
    }
};

module.exports = adminMiddleware;