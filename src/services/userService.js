import * as userRepo from '../repositories/userRepository.js';
import { hashPassword, comparePassword } from '../middlewares/passwordMiddleware.js';

export const getAll = () => userRepo.findAll();

export const getById = (id) => userRepo.findById(id);

export const getUserByEmail = (email) => userRepo.findByEmail(email);

/**
 * Create a new user with hashed password
 */
export const createUser = async (data) => {
  try {
    const hashedPassword = await hashPassword(data.password);
    return userRepo.create({
      ...data,
      password: hashedPassword,
    });
  } catch (err) {
    throw new Error(`Error creating user: ${err.message}`);
  }
};

/**
 * Validate password against stored hash
 */
export const validatePassword = (password, hash) => comparePassword(password, hash);

/**
 * Update user
 */
export const updateUser = (id, data) => userRepo.update(id, data);

/**
 * Delete user
 */
export const deleteUser = (id) => userRepo.deleteUser(id);
