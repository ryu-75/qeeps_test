import express, { Express } from "express";
import cors from "cors";
import { userRouter } from "./routes";

// Init the app
const app: Express = express();

// Setup express
app.use(cors({ origin: "*" }));
app.use(express.json());

// Setup routes
app.use("/users", userRouter);

export default app;
