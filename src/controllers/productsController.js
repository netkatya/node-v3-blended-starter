import createHttpError from 'http-errors';
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductsService,
  updateProductService,
  countProductsService,
} from '../services/productsService.js';

export const getProducts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    category,
    sortBy = 'price',
    sortOrder = 'asc',
  } = req.query;

  console.log('Query params:', {
    page,
    perPage,
    types: (typeof page, typeof perPage),
    category,
  });

  const skip = (page - 1) * parseInt(perPage);
  const limit = parseInt(perPage);

  console.log('Calculated:', { skip, limit });

  // filter, search, by category, sortBy, sortOrder

  const filter = { userId: req.user._id };

  if (category) {
    console.log('Filter by category:', category);
    filter.category = category;
  }

  const [totalItems, products] = await Promise.all([
    countProductsService(filter),
    getProductsService({ skip, limit, filter, sortBy, sortOrder }),
  ]);

  console.log('Results:', { totalItems, productsCount: products.length });

  const totalPages = Math.ceil(totalItems / limit);

  res.status(200).json({
    page: parseInt(page),
    perPage: limit,
    totalItems,
    totalPages,
    data: products,
  });
};

export const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  const product = await getProductByIdService({
    _id: productId,
    userId: req.user._id,
  });

  if (!product) {
    next(createHttpError(404, 'Product not found'));
    return;
  }
  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await createProductService({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(product);
};

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  console.log('🗑️ Attempting to delete product:', {
    productId,
    userId: req.user._id.toString(),
  });

  const product = await deleteProductService({
    _id: productId,
    userId: req.user._id,
  });

  console.log('🗑️ Delete result:', product);

  if (!product) {
    next(createHttpError(404, 'Product not found'));
    return;
  }
  res.status(200).send(product);
};

export const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const product = await updateProductService({
    body: req.body,
    filter: { _id: productId, userId: req.user._id },
  });

  if (!product) {
    next(createHttpError(404, 'Product not found'));
    return;
  }
  res.status(200).json(product);
};
