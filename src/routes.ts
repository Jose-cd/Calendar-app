import express, { Router } from "express";
import { calendarController } from "./controllers/calendarController";

const routes = express.Router();

// Routes
routes.post("/", calendarController.newEvent);
routes.patch("/:eventId", calendarController.editEvent);
export default routes;
