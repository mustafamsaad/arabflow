import { Schema, model, models, Document } from "mongoose";

export interface IAnswer {
  content: string;
  question: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  upvotes: number;
  downvotes: number;
}

export interface IAnswerDoc extends IAnswer, Document {}

const answerSchema = new Schema<IAnswer>(
  {
    content: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Answer = models.Answer || model<IAnswer>("Answer", answerSchema);

export default Answer;
