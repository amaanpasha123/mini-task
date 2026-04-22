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

module.exports = authMiddleware;

