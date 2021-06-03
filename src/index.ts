require("dotenv").config();
import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import accessEnv from "./utils/accessEnv";
import routes from "./routes";
import mongoose from "mongoose";

const PORT = parseInt(accessEnv("PORT", "7000"), 10);
const MONGO_DB_USER = accessEnv("MONGO_DB_USER", "");
const MONGO_DB_PW = accessEnv("MONGO_DB_PW", "");

mongoose.connect(
  `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PW}@cluster0.jupbx.mongodb.net/Cluster0?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw new Error("Ha ocurrido un error ");
    console.log("connected to DB");
    startServer();
  }
);

const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());

  app.use(
    cors({
      origin: (origin, cb) => cb(null, true),
      credentials: true,
    })
  );

  app.use("/", routes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ message: err.message });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.info(`Server is listening on port ${PORT}`);
  });
};
