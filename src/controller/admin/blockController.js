const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.createBlock = async(req, res) => {
    const { block_number } = req.body;
    try {
        const block = await prisma.block.create({
            data: { block_number }
        });
        res.status(201).json(block);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.countBlock = async(req, res) => {
    try {
        const activeCount = await prisma.block.count({
            where: { block_status: 'active' }
        });

        // Count inactive blocks
        const inactiveCount = await prisma.block.count({
            where: { block_status: 'inactive' }
        });

        res.json({
            active: activeCount,
            inactive: inactiveCount
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteBlock = async(req, res) => {
    const { block_id } = req.body;
    try {
        const block = await prisma.block.update({
            where: { id: parseInt(block_id) },
            data: {
                block_status: "delete"
            }
        })
        res.status(200).json(block)
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}