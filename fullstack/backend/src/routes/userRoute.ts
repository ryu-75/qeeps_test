import { UserController } from "../controllers";
import express from "express";

const router = express.Router();
const userController = new UserController();

router.get("/agent", userController.getUsers.bind(userController));
router.get("/candidat", userController.getUsers.bind(userController));

router.post("/agent", userController.createUserController.bind(userController));
router.post("/candidat", userController.createUserController.bind(userController));
export { router as userRouter };
