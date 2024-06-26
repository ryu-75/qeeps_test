import { UserModel } from "../models";

export class UserService {
  private model: typeof UserModel;

  constructor() {
    this.model = UserModel;
  }

  // Récupère tous les utilisateurs
  async getUsers() {
    try {
      const users = await this.model.find();
      return users;
    } catch (err) {
      throw new Error(`Failed to fetch users: ${err}`);
    }
  }

  // Crée un nouvel utilisateur et le sauvegarde dans la base de donnée
  async createUser(first_name: string, last_name: string, phone: string, email: string, status: 'agent' | 'candidat') {
    try {
      const newUser = new this.model({ first_name, last_name, phone, email, status });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    }
  }

  // Met à jour un utilisateur existant par son ID
  async updateUser(_id: string, updateData: { first_name: string, last_name: string, phone: string, email: string }) {
    try {
      const updateUser = await this.model.findByIdAndUpdate(_id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updateUser) {
        throw new Error("User not found");
      }

      return updateUser;
    } catch (err) {
      throw new Error(`Failed to create user: ${err}`);
    }
  }
}
