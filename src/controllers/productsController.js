import createHttpError from 'http-errors';
import {
createProductService,
deleteProductService,
getProductByIdService,
getProductsService,
updateProductService,
} from '../services/productServices.js';

export const getProducts = async (req, res) => {
const products = await getProductsService();
res.status(200).json(products);
};

export const getProductById = async (req, res, next) => {
const { productId } = req.params;
const product = await getProductByIdService(productId);
if (!product) {
next(createHttpError(404, 'Product not found'));
return;
}
res.status(200).json(product);
};
export const createProduct = async (req, res) => {
const product = await createProductService(req.body);
res.status(201).json(product);
};

export const deleteProduct = async (req, res, next) => {
const { productId } = req.params;
const product = await deleteProductService(productId);
if (!product) {
next(createHttpError(404, 'Product not found'));
return;
}
res.status(200).send(product);
};

export const updateProduct = async (req, res, next) => {
const { productId } = req.params;
const product = await updateProductService({ productId, body: req.body });
if (!product) {
next(createHttpError(404, 'Product not found'));
return;
}
res.status(200).json(product);
};
