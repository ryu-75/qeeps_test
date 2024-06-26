import { Request, Response } from "express";
import { UserService } from "../services";

const user = require("../models/userModel");

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  // Récupère les données de tous les utilisateurs
  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.service.getUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Crée un nouvel utilisateur
  async createUserController(req: Request, res: Response) {
    const { first_name, last_name, email, phone, status } = req.body;

    try {
      const newUser = await this.service.createUser(first_name, last_name, email, phone, status);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Met à jour les données d'un utilisateur existant à partir de son ID
  async updateUserController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { first_name, last_name, email, phone } = req.body;

      const updatedUser = await this.service.updateUser(id, { first_name, last_name, email, phone });
      res.json(updatedUser);
    } catch (e: any) {
      res.status(500).json({ error: `Failed to update user: ${e.message}` });
    }
  }
}

