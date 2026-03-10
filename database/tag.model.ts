import { Schema, model, models, Document } from "mongoose";

export interface ITag {
  name: string;
  numberOfQuestions: number;
}

export interface ITagDoc extends ITag, Document {}

const tagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    numberOfQuestions: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Tag = models.Tag || model<ITag>("Tag", tagSchema);

export default Tag;
