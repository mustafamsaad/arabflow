import { Schema, model, models } from "mongoose";

interface IAccount {
  userId: Schema.Types.ObjectId;
  name: string;
  password?: string;
  image?: string;
  provider: string;
  providerAccountId: string;
}

const accountSchema = new Schema<IAccount>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
});

const Account = models.Account || model<IAccount>("Account", accountSchema);
