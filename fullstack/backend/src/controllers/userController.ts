import { Request, Response } from "express";
import { UserService } from "../services";

const user = require("../models/userModel");

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  async getUsers(req: Request, res: Response) {
    // add middleware or validation here
    try {
      const users = await this.service.getUsers();
      res.json(users);
      // errors should be typed
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  async createUserController(req: Request, res: Response) {
    const { first_name, last_name, email, phone, status } = req.body;

    try {
      const newUser = await this.service.createUser(first_name, last_name, email, phone, status);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async signUp(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, phone, otp } = req.body;

      if (!first_name ||
          !last_name ||
            !phone ||
            !otp
      ) {
        return res.status(403).send({
            success: false,
            message: "All fields are required",
        });
      }

      const existingUser = await user.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          succes: false,
          message: "User already exists",
        });
      }

      const response = await otp.find({ email }).sort({ createdAt: -1 }).limit(1);
      console.log(response);
      if (response.length === 0) {
        return res.status(400).json({
          succes: false,
          message: "The OTP is not valid",
        });
      } else if (otp !== response[0].otp) {
        return res.status(400).json({
          succes: false,
          message: "The OTP is not valid",
        });
      }

      const User = await user.create({
        first_name, last_name, email, phone
      })

      return res.status(200).json({
        success: true,
        User,
        message: "User created successfully"
      })
    } catch (e: any) {
      console.error(e)
      return res.status(500).json({
        success: false,
        error: "User registration failed",
      })
    }
  }
}

