import Express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import helmet from "helmet";
import morgan from "morgan";

const app = Express();

app.use(helmet());
app.use(morgan("dev"));


export default app;
