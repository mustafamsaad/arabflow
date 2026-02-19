import { Schema, model, models } from "mongoose";

interface IVote {
  userId: Schema.Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

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
