import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id:    { type: Number, required: true, unique: true },
    name:  { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    versionKey: false,
    toJSON: {
      transform(_doc, ret: any) {
        delete ret._id;
        return ret;
      },
    },
  }
);

export const mongooseProduct =
  mongoose.models.Product || mongoose.model("Product", productSchema);