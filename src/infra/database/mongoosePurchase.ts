import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const purchaseSchema = new mongoose.Schema({
  date: { type: String, required: true },
  total: { type: Number, required: true },
  items: { type: [itemSchema], required: true }
}, {
  versionKey: false,
  toJSON: {
    transform(_doc, ret: any) {
      ret.id = ret._id?.toString?.();
      delete ret._id;
      return ret;
    }
  }
});

export const mongoosePurchase = mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);