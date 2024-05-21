const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.createMessage = async(req, res) => {
    const { issue } = req.body;


    try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Convert to YYYY-MM-DD HH:MM:SS format

        const newNotice = await prisma.create({
            data: { issue, notice_date: formattedDate, status: "admin" }
        })

        // Return the newly created notices as response
        res.status(201).json(newNotices);
    } catch (error) {
        console.error('Create message error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getMessage = async(req, res) => {
    const { id } = req.body()
    try {

        const messages = await prisma.notice.findMany({
            where: { rentee_id: id }
        });
        // Return users as response
        res.json(messages);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}