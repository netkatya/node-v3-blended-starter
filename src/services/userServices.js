import { User } from '../models/user.js';

export const getUserByID = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

export const updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
  return user;
};
