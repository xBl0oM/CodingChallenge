require("dotenv").config();
const express = require("express");
const cors = require("cors");

const leadsRoutes = require("./routes/leads");
const customersRoutes = require("./routes/customers");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use("/auth", authRoutes);

// Protected Routes
app.use("/leads", leadsRoutes);
app.use("/customers", customersRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
