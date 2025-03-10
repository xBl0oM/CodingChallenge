const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword }
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
});

// Register a new manager
router.post("/register-manager", async (req, res) => {
    const { email, password, adminKey } = req.body;

    try {
        // Ensure only an existing Manager can create another Manager
        if (adminKey !== process.env.ADMIN_KEY) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        // Check if manager already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

     
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newManager = await prisma.user.create({
            data: { email, password: hashedPassword, role: "MANAGER" }
        });

        res.status(201).json({ message: "Manager registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering manager" });
    }
});


// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login route hit", req.body); 
    console.log("JWT_SECRET:", process.env.JWT_SECRET); 

    try {
        // Find user in database
        const user = await prisma.user.findUnique({ where: { email } });
        console.log("User from DB:", user); // Debug log the entire user object

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match");
            return res.status(400).json({ error: "Invalid email or password" });
        }
   
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token, role: user.role });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ error: "Error logging in" });
    }
});



module.exports = router;
