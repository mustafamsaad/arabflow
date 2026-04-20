import { Schema, model, models, Document } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags?: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  upvotes: number;
  downvotes: number;
  views: number;
  answers: number;
}

export interface IQuestionDoc extends IQuestion, Document {}

const questionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Question =
  models.Question || model<IQuestion>("Question", questionSchema);

export default Question;
