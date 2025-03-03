require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Lead Management System API is running...");
});

// Get all leads
app.get("/leads", async (req, res) => {
    const leads = await prisma.lead.findMany();
    res.json(leads);
});

// Create a new lead
app.post("/leads", async (req, res) => {
    const { name, sex, gender, address, leadSource } = req.body;
    const newLead = await prisma.lead.create({
        data: { name, sex, gender, address, leadSource }
    });
    res.json(newLead);
});

// Convert a lead to a customer
app.post("/leads/:id/convert", async (req, res) => {
    const { id } = req.params;
    const convertedLead = await prisma.customer.create({
        data: { leadId: id }
    });
    res.json(convertedLead);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
