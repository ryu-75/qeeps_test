import { UserController } from "../controllers";
import express from "express";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getUsers.bind(userController));
router.post("/", userController.createUserController.bind(userController));
router.patch("/", userController.createUserController.bind(userController));

export { router as userRouter };
