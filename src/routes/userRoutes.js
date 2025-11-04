// src/routes/userRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  updateUser,
  updateUserAvatar,
  getTelegramStatus,
  sendTelegramNotification,
} from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';
import { env } from '../utils/env.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

router.patch('/users/me', authenticate, updateUser);

if (env('NODE_ENV') === 'production') {
  router.get('/users/:userId/telegram-status', authenticate, getTelegramStatus);
  router.post('/users/notify', authenticate, sendTelegramNotification);
}

export default router;
