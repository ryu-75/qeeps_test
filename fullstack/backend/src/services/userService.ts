import { UserModel } from "../models";

export class UserService {
  private model: typeof UserModel;

  constructor() {
    this.model = UserModel;
  }

  async getUsers() {
    // add logic here
    return this.model.find();
  }
}
