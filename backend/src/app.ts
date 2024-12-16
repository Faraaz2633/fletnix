import express, { json, Request, Response, urlencoded } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import hpp from "hpp";
import routes from "./routes";
import { connectToDatabase } from "./database/config";
import { handleStartCron } from "./services/cron";

const RATE_TIME_LIMIT = Number(process.env.RATE_TIME_LIMIT) || 15;
const RATE_REQUEST_LIMIT = Number(process.env.RATE_REQUEST_LIMIT) || 100;

const app = express();

app.use(json());
app.use(morgan("tiny"));
app.use(urlencoded({ extended: false }));
app.use(
  rateLimit({
    windowMs: RATE_TIME_LIMIT * 60 * 1000,
    max: RATE_REQUEST_LIMIT,
  })
);
app.use(cors());
app.use(helmet());
app.use(hpp());

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

app.use(routes);
handleStartCron();

connectToDatabase();

export default app;
