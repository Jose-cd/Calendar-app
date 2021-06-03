import express from "express";
import { calendarController } from "./controllers/calendarController";

const routes = express.Router();

// Routes routes
routes.get("/", calendarController.helloWorld);

export default routes;
