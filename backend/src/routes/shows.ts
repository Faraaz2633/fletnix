import { Router } from "express";
import * as controller from "../controller/shows";

export const shows = Router();

shows.get("/", controller.getAllShows);
shows.get("/:id", controller.getSingleShow);
