import Errorhandler from "../middlewares/error.js";
import { Product } from "../models/productModel.js";

export const getAllProducts = async (req, res, next) => {
  try {
    let products = await Product.find().populate("seller", "userName");

    if (products) {
      res.status(200).json(products);
    } else {
      return next(new Errorhandler("Products not found", 404));
    }
  } catch (error) {
    return next(new Errorhandler(error.message, 500));
  }
};

export const getProductById = async (req, res, next) => {
  const { sellerId } = req.params;

  try {
    const product = await Product.find({ seller: sellerId });
    if (product) {
      res.status(200).json(product);
    } else {
      return next(new Errorhandler("Product not found", 404));
    }
  } catch (error) {
    return next(new Errorhandler(error.message, 500));
  }
};

export const createProduct = async (req, res, next) => {
  const { name, description, price, seller } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      seller,
    });

    const newProduct = await product.save();

    if (newProduct) {
      res.status(201).json(newProduct);
    } else {
      return next(new Errorhandler("Product not created", 400));
    }
  } catch (error) {
    return next(new Errorhandler(error.message, 500));
  }
};
