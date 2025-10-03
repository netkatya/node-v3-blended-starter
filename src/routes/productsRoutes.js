import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productsController.js';
const router = Router();

router.get('/products', getProducts);
router.get('/products/:productId', getProductById);
router.post('/products', createProduct);
router.delete('/products/:productId', deleteProduct);
router.patch('/products/:productId', updateProduct);

export default router;
