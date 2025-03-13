// routes/customers.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { authMiddleware, managerMiddleware } = require('../middleware/authMiddleware');

// GET /customers - List all customers
router.get('/', authMiddleware, async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/convert/:id', authMiddleware, managerMiddleware, async (req, res) => {
  try {
    const { id } = req.params; 
    
    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    
    const customer = await prisma.customer.create({
      data: {
        name: lead.name,
        sex: lead.sex,
        gender: lead.gender,
        address: lead.address,
        leadSource: lead.leadSource,
        
      },
    });

    // Delete the lead after conversion
    await prisma.lead.delete({ where: { id } });

    res.json({ message: 'Lead converted successfully', customer });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
