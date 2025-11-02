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

export const getProductByIdService = async (filter) => {
  return await Product.findOne(filter);
};

export const createProductService = async (body) => {
  return await Product.create(body);
};

export const deleteProductService = async (filter) => {
  console.log('🔧 Service deleteProduct called with filter:', filter);
  const result = await Product.findOneAndDelete(filter);
  console.log('🔧 Service delete result:', result);
  return result;
};

export const updateProductService = async ({ filter, body }) => {
  return await Product.findOneAndUpdate(filter, body, {
    new: true,
  });
};
