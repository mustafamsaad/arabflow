import { Schema, model, models } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  bio?: string;
  location?: string;
  image: string;
  portfolio?: string;
  reputation: number;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    location: { type: String },
    image: { type: String, required: true },
    portfolio: { type: String },
    reputation: { type: Number, required: true },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
