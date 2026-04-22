const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
 try {

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message : "Token is not found"});
    }

   const token = req.headers.authorization.split(" ")[1];

   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   req.user = decoded;

   next();

 } catch (error) {
   res.status(401).json({ message: "Unauthorized" });
 }
};


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


module.exports = authMiddleware;

