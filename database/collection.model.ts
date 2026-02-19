import { Schema, model, models } from "mongoose";

interface ICollection {
  userId: Schema.Types.ObjectId;
  questions: Schema.Types.ObjectId[];
}

const collectionSchema = new Schema<ICollection>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true },
);

const Collection =
  models.Collection || model<ICollection>("Collection", collectionSchema);

export default Collection;
