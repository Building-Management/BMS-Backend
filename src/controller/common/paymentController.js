//src/controller/common/paymentController.js

// import axios from "axios";
const axios = require("axios");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
// import { nanoid } from "nanoid";
const { nanoid } = require("nanoid");
// import crypto from "crypto";
const crypto = require("crypto");

exports.createPayment = async(req, res) => {
    const { blockId } = req.params; // Assuming userId is passed in the request parameters

    try {
        // Retrieve block from the database based on block ID

        // const Block = await prisma.block.findFirst({
        //     where: { id: parseInt(blockId) } // Convert userId to integer if it's a string
        // });

        const block = await prisma.block.findUnique({
            where: { id: blockId },
            include: {
                jobs: {
                    include: {
                        rentee: true // Include the rentee associated with the job
                    }
                }
            }
        });

        // If user does not exist, return 404 Not Found
        if (!block) {
            return res.status(404).json({ error: 'block not found' });
        }

        //Retrieve based on the rente id

        // const Rentee = await prisma.block.findFirst({
        //     where: { id: parseInt(Block.rente) } // Convert userId to integer if it's a string
        // });

        // Extract rentee from the block's associated job
        const rentee = block.jobs[0] && block.jobs[0].rentee;
        const contract = await prisma.Contract.findFirst({
            where: {
                block_id: blockId,
            },
        });

        if (!rentee) {
            throw new Error('Rentee not found for the block');
        }

        // txRef is a unique identifier that will be sent to chapa and later get used to verify the payment transaction
        const txRef = nanoid();

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Convert to YYYY-MM-DD HH:MM:SS format


        const order = {
            rent_price: contract.monthly_payment,
            payment_date: formattedDate,
            txRef: txRef,
            contract_id: contract.id,
        };


        // creating our order
        await Payment.create(order);

        // building the chapa request with the necessary data's
        // note that additional fields can be set as well, like phoneNumber, email ...
        let chapaRequestData = {
            first_name: rentee.name,
            email: rentee.email,
            amount: contract.monthly_payment,
            tx_ref: txRef,
            currency: "ETB",
        };

        // making a request to chapa server
        const response = await axios.post(
            `https://api.chapa.co/v1/transaction/mobile-initialize`,
            chapaRequestData, {
                headers: {
                    Authorization: "Bearer " + process.env.CHAPA_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        // check if succesful
        if (response.data["status"] == "success") {
            return res.json({
                msg: "payment created successfully. Perform payment.",
                paymentUrl: response.data["data"]["checkout_url"],
            });
        } else {
            return res.status(500).json({
                msg: "Something went wrong",
            });
        }

    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}



exports.verifyPayment = async(req, res) => {
    try {
        //validate that this was indeed sent by Chapa's server
        // this is where we use the Secret hash we saved in .env
        const hash = crypto
            .createHmac("sha256", process.env.CHAPA_WEBHOOK_SECRET)
            .update(JSON.stringify(req.body))
            .digest("hex");
        if (hash == req.headers["x-chapa-signature"]) {
            // Retrieve the request's body
            const event = req.body;

            const { tx_ref, status } = event;
            if (status == "success" && tx_ref) {
                // hit the verify endpoint to make sure a transaction with the given
                // tx_ref was successful
                const response = await axios.get(
                    `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,

                    {
                        headers: {
                            Authorization: "Bearer " + process.env.CHAPA_KEY,
                        },
                    }
                );
                if (response.status == 200) {
                    // if successful find the order
                    if (response.data["status"] == "success") {
                        let tx_ref = response.data["data"]["tx_ref"];
                        const order = await OrderCollection.findOne({
                            txRef: tx_ref,
                        });
                        // check if the order doesn't exist or payment status is not pending
                        if (!order || order.paymentStatus != "pending") {
                            // Return a response to acknowledge receipt of the event
                            return res.sendStatus(200);
                        }
                        // change payment status to completed
                        if (order.paymentStatus == "pending") {
                            order.paymentStatus = "completed";
                            await order.save();
                            // Return a response to acknowledge receipt of the event
                            return res.sendStatus(200);
                        }
                    }
                }
            }
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};