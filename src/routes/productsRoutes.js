import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productsController.js';
import {
  createProductSchema,
  getProductsSchema,
  productIdSchema,
  updateProductSchema,
} from '../validation/productsValidation.js';

import { authenticate } from "../middleware/authenticate.js";

const router = Router();





router.get('/', celebrate(getProductsSchema), getProducts);
router.get('/:productId', celebrate(productIdSchema), getProductById);

// authent should be before get"/"
router.use(authenticate);
router.post('/', celebrate(createProductSchema), createProduct);
router.delete('/:productId', celebrate(productIdSchema), deleteProduct);
router.patch('/:productId', celebrate(updateProductSchema), updateProduct);

export default router;
