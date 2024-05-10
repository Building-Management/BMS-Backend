const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.createContract = async(req, res) => {
    const { start_date, end_date, monthly_payment, rentee_id, block_id } = req.body;
    try {

        // Create contract in the database 
        const newContract = await prisma.Contract.create({
            data: { start_date, end_date, monthly_payment, rentee_id, block_id }
        });

        // Return newly created contract as response
        res.status(201).json(newContract);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllContracts = async(req, res) => {
    try {
        // Fetch all contracts from the database
        const contracts = await prisma.Contract.findMany();

        // Return contracts as response
        res.json(contracts);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getContractsById = async(req, res) => {
    const { contractId } = req.params; // Assuming contractId is passed in the request parameters

    try {
        // Retrieve contract from the database based on contract ID
        const contract = await prisma.Contract.findFirst({
            where: { id: parseInt(contractId) } // Convert contractId to integer if it's a string
        });

        // If user does not exist, return 404 Not Found
        if (!contract) {
            return res.status(404).json({ error: 'contract not found' });
        }

        // Return the contract as response
        res.json({ contract });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.updateContract = async(req, res) => {
    const { contractId } = req.params; // Assuming contractId is passed in the request parameters

    try {
        status_contract = "deactivated"
            // Update contact status in the database
        const updatedContract = await prisma.Contract.update({
            where: { id: parseInt(contractId) }, // Convert contractId to integer if it's a string
            data: {
                status: status_contract
            }
        });

        // If contract is not found, return 404 Not Found
        if (!updatedContract) {
            return res.status(404).json({ error: 'contract not found' });
        }

        // Return the updated contract or deactivated contract as response
        res.json(updatedContract);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}