import { Router } from "express";

export const shows = Router();

shows.post("/");
shows.post("/:id");
