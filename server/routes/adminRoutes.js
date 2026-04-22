const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const adminController = require("../controllers/adminController");

// =========================
// 🔐 APPLY MIDDLEWARE TO ALL ROUTES
// =========================
router.use(authMiddleware);
router.use(adminMiddleware);

// =========================
// 👤 USERS
// =========================
router.get("/users", adminController.getAllUsers);
router.delete("/users/:id", adminController.deleteUser);




module.exports = router;