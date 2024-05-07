// src/controller/common/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controller function for user login
exports.login = async(req, res) => {
    const { email, password, role } = req.body;

    try {
        // Retrieve user from the corresponding table based on the provided role
        let user;
        switch (role) {
            case 'admin':
                user = await prisma.admin.findFirst({ where: { email } });
                break;
            case 'rentee':
                user = await prisma.rentee.findFirst({ where: { email } });
                break;
            case 'freelancer':
                user = await prisma.freelancer.findFirst({ where: { email } });
                break;
            default:
                return res.status(401).json({ error: 'Invalid role' });
        }

        // If user does not exist, return 401 Unauthorized
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If password does not match, return 401 Unauthorized
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token with user information
        const token = jwt.sign({ userId: user.id, email: user.email, role },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        // Return token and role as response
        res.json({ token, role });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};