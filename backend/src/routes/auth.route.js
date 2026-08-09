import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/auth.controller.js";

import protectedMiddleware from "./../middlewares/auth.middleware.js";
import passport from './../config/passport.config.js';

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.get("/profile", protectedMiddleware, profile);
route.post("/logout", protectedMiddleware, logout);

route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

route.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
    console.log("Google User:", req.user);

    res.json({
      success: true,
      message: "Google login successful",
      user: req.user,
    });
  },
);

export default route;
