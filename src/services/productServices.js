import { Product } from '../models/product.js';

export const getProductsService = async () => {
  return await Product.find();
};

export const getProductByIdService = async (productId) => {
  return await Product.findById(productId);
};

export const createProductService = async (body) => {
  return await Product.create(body);
};

export const deleteProductService = async (productId) => {
  return await Product.findOneAndDelete({
    _id: productId,
  });
};

export const updateProductService = async ({ productId, body }) => {
  return await Product.findOneAndUpdate({ _id: productId }, body, {
    new: true,
  });
};
