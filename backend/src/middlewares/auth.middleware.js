import JWT from "jsonwebtoken";
import { findUserById } from "../repository/user.repository.js";

const protectedMiddleware = async (req, res, next) => {
  try {
    let token = null;

    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token not found.",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

    const user = await findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default protectedMiddleware;
