const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.createMessage = async(req, res) => {
    const { issue, rentees } = req.body;

    // Validate input
    if (!issue || !rentees || !Array.isArray(rentees) || rentees.length === 0) {
        return res.status(400).json({ error: 'Invalid input: issue and rentees are required' });
    }

    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Convert to YYYY-MM-DD HH:MM:SS format

        // Fetch the selected rentees
        const selectedRentees = await prisma.rentee.findMany({
            where: {
                id: { in: rentees.map(r => r.renteeId) }
            }
        });

        if (selectedRentees.length === 0) {
            return res.status(404).json({ error: 'No rentees found with the provided IDs' });
        }

        // Create notices for the selected rentees and connect with their respective blocks
        const newNotices = await Promise.all(rentees.map(async({ renteeId, blockId }) => {
            return await prisma.notice.create({
                data: {
                    issue,
                    notice_date: formattedDate,
                    status: "rentee",
                    blocks: {
                        connect: { id: blockId }
                    },
                    rentees: {
                        connect: { id: renteeId }
                    }
                }
            });
        }));

        // Return the newly created notices as response
        res.status(201).json(newNotices);
    } catch (error) {
        console.error('Create message error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getMessage = async(req, res) => {

    try {

        const messages = await prisma.notice.findMany({
            where: { status: "admin" }
        });
        // Return users as response
        res.json(messages);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}