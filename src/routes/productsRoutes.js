import { Router } from 'express';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:productId', getProductById);
router.post('/products', createProduct);
router.delete('/products/:productId', deleteProduct);
router.patch('/products/:productId', updateNote);

export default router;


