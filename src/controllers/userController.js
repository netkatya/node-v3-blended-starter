// src/controllers/userController.js

import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import {
  saveFileToCloudinary,
  deleteFileFromCloudinary,
} from '../utils/saveFileToCloudinary.js';
import { sendTBMessage } from '../utils/telegramBot.js';

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    next(createHttpError(400, 'No file'));
    return;
  }

  const result = await saveFileToCloudinary(req.file.buffer);

  if (req.user.avatar_id !== '') {
    await deleteFileFromCloudinary(req.user.avatar_id);
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url, avatar_id: result.public_id },
    { new: true },
  );

  res.status(200).json(user);
};

export const updateUser = async (req, res, next) => {
  const { body } = req;

  const user = await User.findByIdAndUpdate(req.user._id, body, { new: true });

  res.status(200).json(user);
};

export const getTelegramStatus = async (req, res, next) => {
  const user = await User.findById(req.user._id, { new: true });

  res.status(200).json({ isLinked: !!user?.telegramChatId });
};

export const sendTelegramNotification = async (req, res, next) => {
  const { text } = req.body;
  const user = await User.findById(req.user._id);

  if (!user?.telegramChatId) {
    return res.status(400).json({ message: 'User is not linked to Telegram' });
  }

  await sendTBMessage(user.telegramChatId, text);
  res.send('✅ Повідомлення надіслано');

  res.status(200).json({ message: 'Notification sent' });
};
