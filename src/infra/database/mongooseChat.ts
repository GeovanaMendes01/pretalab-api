import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    conversationId: { type: String, required: true, index: true },
    role: { type: String, enum: ["user", "model"], required: true },
    text: { type: String, required: true },
    scope: { type: String, enum: ["transactions", "purchases", "general"], default: "transactions" },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
    toJSON: {
      transform(_doc, ret: any) {
        ret.id = ret._id?.toString?.();
        delete ret._id;
        return ret;
      },
    },
  }
);

export const mongooseChatMessage =
  mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", chatMessageSchema);