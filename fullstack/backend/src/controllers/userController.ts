import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  getUsers = async (req: Request, res: Response) => {
    // add middleware or validation here
    try {
      const users = await this.service.getUsers();
      res.json(users);
      // errors should be typed
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
