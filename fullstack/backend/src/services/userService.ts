import { UserModel } from "../models";

export class UserService {
  private model: typeof UserModel;

  constructor() {
    this.model = UserModel;
  }

  async getUsers() {
    try {
      const users = await this.model.find();
      return users;
    } catch (err) {
      throw new Error(`Failed to fetch users: ${err}`);
    }
  }

  async createUser(first_name: string, last_name: string, phone: string, email: string, status: 'agent' | 'candidat') {
    try {
      const newUser = new this.model({ first_name, last_name, phone, email, status });
      const savedUser = await newUser.save();
      console.log(savedUser);
      return savedUser;
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    }
  }
}
