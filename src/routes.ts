import express, { Router } from "express";
import { calendarController } from "./controllers/calendarController";

const routes = express.Router();

// Routes
routes.post("/", calendarController.newEvent);
routes.patch("/:id", calendarController.editEvent);
routes.delete("/:id", calendarController.deleteEvent);
routes.get("/", calendarController.getEvents);
export default routes;
