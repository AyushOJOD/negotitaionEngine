import { Product } from "../models/productModel";

export const getAllProducts = async (req, res, next) => {
  try {
    let products = await Product.find({});
  } catch (error) {}
};
