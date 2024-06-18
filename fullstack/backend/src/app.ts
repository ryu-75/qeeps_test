import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { otpRouter, userRouter } from "./routes";

// Init the app
const app: Express = express();

// Setup express
app.use(cors({ origin: "*" }));
app.use(express.json());

// Setup routes
app.use("/users", userRouter);
app.use("/otp", otpRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
