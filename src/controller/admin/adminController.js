// src/controllers/userController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


// Controller function for creating a new user
exports.createUser = async(req, res) => {
    const { name, email, phone_number, password, address, account_number, role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database with hashed password
        const newUser = await prisma.admin.create({
            data: { name, phone_number, email, password: hashedPassword, address, account_number, role }
        });

        // Return newly created user as response
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};