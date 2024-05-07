// src/controllers/userController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Controller function for fetching all users
exports.getAllUsers = async(req, res) => {
    try {

        const { userId, email, role } = req.user;

        // Fetch all users from the database
        const users = await prisma.user.findMany();

        // Return users as response
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function for creating a new user
exports.createUser = async(req, res) => {
    const { email, password, role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database with hashed password
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword, role }
        });

        // Return newly created user as response
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};