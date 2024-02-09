import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Product = new mongoose.model("Product", productSchema);
