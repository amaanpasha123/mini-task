
//checking for admin this time over here....
const adminMiddleware = (req, res, next) => {
    try {
        // req.user must come from authMiddleware first
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin access denied" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = adminMiddleware;
