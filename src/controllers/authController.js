import * as userService from '../services/userService.js';
import { generateToken } from '../middlewares/authMiddleware.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await userService.validatePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        active: user.active,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    const user = await userService.getById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};
