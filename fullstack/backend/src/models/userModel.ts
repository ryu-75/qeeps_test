import mongoose from "mongoose";

// Définit la structure du document OTP
export interface IUser extends mongoose.Document {
  first_name: string;
  last_name: string;
  status: string;
  phone: string;
  email: string;
}

// Schéma pour le modèle User
const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['agent', 'candidat'],
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    }
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
