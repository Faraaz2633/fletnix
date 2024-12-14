import { Router, Request, Response } from "express";
import { auth } from "./auth";
import { shows } from "./shows";
import { validateToken } from "../middlewares/auth";

const routes = Router();

routes.get("/api", (req: Request, res: Response) => {
  res.send("Welcome to FletNix");
});

routes.use("/api/auth", auth);
routes.use("/api/shows", validateToken, shows);

export default routes;
