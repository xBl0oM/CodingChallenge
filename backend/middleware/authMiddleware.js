const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

const managerMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "MANAGER") {
        return res.status(403).json({ error: "Access denied. Manager privileges required." });
    }
    next();
};

module.exports = { authMiddleware, managerMiddleware };
