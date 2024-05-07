const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


exports.createJob = async(req, res) => {
    const { job_id, job_description, status, rentee_id, block_id } = req.body;

    try {

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Convert to YYYY-MM-DD HH:MM:SS format

        // Create job in the database 
        const newJob = await prisma.job.create({
            data: { job_id, job_description, status, date: formattedDate, rentee_id, block_id }
        });

        // Return newly created job as response
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllJobs = async(req, res) => {
    try {
        // Fetch all users from the database
        const jobs = await prisma.job.findMany();

        // Return users as response
        res.json(jobs);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}