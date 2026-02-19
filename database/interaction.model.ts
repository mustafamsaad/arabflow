import { Schema, model, models } from "mongoose";

interface IInteraction {
  userId: Schema.Types.ObjectId;
  action: string;
  actionId: Schema.Types.ObjectId;
  actionType: "question" | "answer";
}

const interactionSchema = new Schema<IInteraction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: { type: String, enum: ["question", "answer"], required: true },
  },
  { timestamps: true },
);

const Interaction =
  models.Interaction || model<IInteraction>("Interaction", interactionSchema);

export default Interaction;
