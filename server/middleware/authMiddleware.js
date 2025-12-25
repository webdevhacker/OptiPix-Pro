const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Get token
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Get User from DB
            // ✅ FIX: Use 'await' and check if user exists
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                // Stop here if user not found in DB (even if token is valid)
                return res.status(401).json({ message: 'User not found / Token invalid' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("Middleware Error:", error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };