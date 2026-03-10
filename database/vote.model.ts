import { Schema, model, models, Document } from "mongoose";

export interface IVote {
  userId: Schema.Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

export interface IVoteDoc extends IVote, Document {}

const voteSchema = new Schema<IVote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["question", "answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { timestamps: true },
);

const Vote = models.Vote || model<IVote>("Vote", voteSchema);
export default Vote;
