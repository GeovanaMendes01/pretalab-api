import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
  },
  {
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

export const mongooseTransaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
