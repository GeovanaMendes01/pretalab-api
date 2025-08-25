import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id:    { type: String, required: true, unique: true },
    name:  { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    versionKey: false,
    toJSON: {
      transform(_doc, ret: any) {
        ret.id = String(ret._id);
        delete ret._id;
        return ret;
      },
    },
  }
);

export const mongooseProduct =
  mongoose.models.Product || mongoose.model("Product", productSchema);