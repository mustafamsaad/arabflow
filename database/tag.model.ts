import { Schema, model, models } from "mongoose";

interface ITag {
  name: string;
  numberOfQuestions: number;
}

const tagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    numberOfQuestions: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Tag = models.Tag || model<ITag>("Tag", tagSchema);

export default Tag;
