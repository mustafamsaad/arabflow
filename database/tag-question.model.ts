import { Schema, model, models, Document } from "mongoose";

export interface ITagQuestion {
  tag: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
}

export interface ITagQuestionDoc extends ITagQuestion, Document {}

const tagQuestionSchema = new Schema<ITagQuestion>(
  {
    tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  { timestamps: true },
);

const TagQuestion =
  models.TagQuestion || model<ITagQuestion>("TagQuestion", tagQuestionSchema);

export default TagQuestion;
