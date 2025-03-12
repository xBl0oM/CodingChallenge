const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { authMiddleware, managerMiddleware } = require("../middleware/authMiddleware");


const prisma = new PrismaClient();
const router = express.Router();

// Get all leads (protected)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const leads = await prisma.lead.findMany();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: "Error fetching leads" });
    }
});

// Create a new lead (Managers only)
router.post("/", authMiddleware, managerMiddleware, async (req, res) => {
    const { name, sex, gender, address, leadSource } = req.body;
    try {
        const newLead = await prisma.lead.create({
            data: { name, sex, gender, address, leadSource }
        });
        res.status(201).json(newLead);
    } catch (error) {
        res.status(500).json({ error: "Error creating lead" });
    }
});

// Update a lead (Managers only)
router.put("/:id", authMiddleware, managerMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name, sex, gender, address, leadSource } = req.body;
    
    try {
        const updatedLead = await prisma.lead.update({
            where: { id },
            data: { name, sex, gender, address, leadSource }
        });
        res.json(updatedLead);
    } catch (error) {
        res.status(500).json({ error: "Error updating lead" });
    }
});

// Delete a lead (Managers only)
router.delete("/:id", authMiddleware, managerMiddleware, async (req, res) => {
    const { id } = req.params;
    
    try {
        await prisma.lead.delete({ where: { id } });
        res.json({ message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting lead" });
    }
});

module.exports = router;

