import { Schema, model, models } from "mongoose";

interface IQuestion {
  title: string;
  content: string;
  tags?: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  upvotes: number;
  downvotes: number;
  answers: number;
}

const questionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Question =
  models.Question || model<IQuestion>("Question", questionSchema);

export default Question;
