// src/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controller function for user login
exports.login = async(req, res) => {
    const { email, password } = req.body;

    try {
        // Retrieve user from database based on email
        const user = await prisma.user.findFirst({
            where: { email }
        });

        // If user does not exist, return 401 Unauthorized
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If password does not match, return 401 Unauthorized
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid  password' });
        }

        // Generate JWT token with user information
        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        // Return token as response
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};