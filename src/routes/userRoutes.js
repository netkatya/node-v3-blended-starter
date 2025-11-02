// src/routes/userRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { updateUser, updateUserAvatar } from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

router.patch('/users/me', authenticate, updateUser);

export default router;
