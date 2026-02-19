import { Schema, model, models } from "mongoose";

interface IAnswer {
  content: string;
  question: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  upvotes: number;
  downvotes: number;
}

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
