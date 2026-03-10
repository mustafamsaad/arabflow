import { Schema, model, models, Document } from "mongoose";

export interface ICollection {
  userId: Schema.Types.ObjectId;
  questions: Schema.Types.ObjectId[];
}

export interface ICollectionDoc extends ICollection, Document {}

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
