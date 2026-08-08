import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import helmet from "helmet";
import morgan from "morgan";
import route from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import passport from "./config/passport.config.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/users", route);

export default app;
