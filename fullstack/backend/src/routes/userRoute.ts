import { UserController } from "../controllers";
import express from "express";

const router = express.Router();
const userController = new UserController();

// Route GET retourne tous les utilisateurs
router.get("/", userController.getUsers.bind(userController));

// Route POST créer un nouvel utilisateur
router.post("/", userController.createUserController.bind(userController));

// Route PUT met à jour un utilisateur à partir de son ID
router.put("/:id", userController.updateUserController.bind(userController));

export { router as userRouter };
