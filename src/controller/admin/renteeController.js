// src/controllers/userController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

// Controller function for fetching all users
exports.getAllUsers = async(req, res) => {
    try {

        const { Id, email, role } = req.user;

        // Fetch all users from the database
        const users = await prisma.rentee.findMany();

        // Return users as response
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function for creating a new user
exports.createUser = async(req, res) => {
    const { name, phone_number, email, password, kebele_url, contract_url, role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in the database with hashed password
        const newUser = await prisma.rentee.create({
            data: { name, phone_number, email, password: hashedPassword, kebele_url, contract_url, role }
        });

        // Return newly created user as response
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller function to get a specific user by ID
exports.getUserById = async(req, res) => {
    const { userId } = req.params; // Assuming userId is passed in the request parameters

    try {
        n // Retrieve user from the database based on user ID
        const user = await prisma.rentee.findFirst({
            where: { id: parseInt(userId) } // Convert userId to integer if it's a string
        });

        // If user does not exist, return 404 Not Found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user as response
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function for updating user information
exports.updateUser = async(req, res) => {
    const { userId } = req.params; // Assuming userId is passed in the request parameters
    const { name, phone_number, email, password, kebele_url, contact_url, role } = req.body;

    try {
        // Hash the password if provided
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        // Update user in the database
        const updatedUser = await prisma.rentee.update({
            where: { id: parseInt(userId) }, // Convert userId to integer if it's a string
            data: {
                name,
                phone_number,
                email,
                password: hashedPassword,
                kebele_url,
                contact_url,
                role
            }
        });

        // If user is not found, return 404 Not Found
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the updated user as response
        res.json(updatedUser);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// Controller function to update the status of a user to 'delete' by ID
exports.deleteUserById = async(req, res) => {
    const { userId } = req.params; // Assuming userId is passed in the request parameters

    try {
        // Update user status to 'delete' in the database
        const updatedUser = await prisma.rentee.update({
            where: { id: parseInt(userId) }, // Convert userId to integer if it's a string
            data: { status: 'delete' }
        });

        // If user is not found, return 404 Not Found
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the updated user as response
        res.json({ updatedUser });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};