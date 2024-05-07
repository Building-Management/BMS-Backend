// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Authorization middleware
exports.authorize = (...roles) => (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user has the required role
        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Attach user data to request object
        req.user = decoded;

        // Call next middleware
        next();
    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};