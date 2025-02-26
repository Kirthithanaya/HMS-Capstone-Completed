import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dotenv from "dotenv";
dotenv.config();

// Protect routes (Only logged-in users can access)
export const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
  const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };

// Role-based access control middleware
  export const authorize = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    };
  };

  export default authMiddleware;