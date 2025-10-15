import { Product } from '../models/product.js';

// export const getProductsService = () => {
//   return Product.find();
// };

export const getProductsService = async ({
  skip = 0,
  limit = 10,
  filter = {},
  sortBy = '_id',
  sortOrder = 'asc',
} = {}) => {
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  return await Product.find(filter).sort(sort).skip(skip).limit(limit);

};

export const countProductsService = async (filter = {}) => {
  return await Product.countDocuments(filter);
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
