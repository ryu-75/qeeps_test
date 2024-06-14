import { UserController } from "../controllers";
import express from "express";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getUsers);

export { router as userRouter };
