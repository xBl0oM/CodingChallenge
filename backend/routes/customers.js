const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { authMiddleware} = require("../middleware/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

// Convert a lead to a customer (protected)
router.post("/:id/convert", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const existingCustomer = await prisma.customer.findUnique({
            where: { leadId: id }
        });

        if (existingCustomer) {
            return res.status(400).json({ error: "Lead is already a customer" });
        }

        const newCustomer = await prisma.customer.create({
            data: { leadId: id }
        });

        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: "Error converting lead to customer" });
    }
});

// Get all customers (protected)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const customers = await prisma.customer.findMany({
            include: { lead: true }
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching customers" });
    }
});

module.exports = router;
