import { Router } from "express";
import * as controller from "../controller/user";

export const auth = Router();

auth.post("/signup", controller.signup);
auth.post("/login", controller.login);
auth.post("/validate", controller.login);
// auth.post("/reset-password");
