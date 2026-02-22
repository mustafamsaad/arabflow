import { Schema, model, models } from "mongoose";

interface IUser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  image?: string;
  portfolio?: string;
  reputation?: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    location: { type: String },
    image: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
