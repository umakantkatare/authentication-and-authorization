import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/auth.controller.js";
import protectedMiddleware from "./../middlewares/auth.middleware.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.get("/profile", protectedMiddleware, profile);
route.post("/logout", protectedMiddleware, logout);

export default route;
