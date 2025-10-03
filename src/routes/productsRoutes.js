import { Router } from 'express';

import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productsController.js';
const router = Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);
router.post('/', createProduct);
router.delete('/:productId', deleteProduct);
router.patch('/:productId', updateProduct);

export default router;
