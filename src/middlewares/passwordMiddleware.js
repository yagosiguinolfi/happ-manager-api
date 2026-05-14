import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash a password
 */
export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (err) {
    throw new Error(`Error hashing password: ${err.message}`);
  }
};

/**
 * Compare a password with its hash
 */
export const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new Error(`Error comparing password: ${err.message}`);
  }
};
