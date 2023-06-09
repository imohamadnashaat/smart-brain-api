import Joi from 'joi';

import { generateToken } from '../../utils/jwt.util.js';
import { hashPassword, comparePasswords } from '../../utils/bcrypt.util.js';
import { loginByEmail } from '../../models/auth.model.js';
import { createUser, getUserByEmail } from '../../models/users.model.js';

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(400).json({
        message: 'Unable to register with this email.',
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser(name, email, hashedPassword);

    const token = generateToken({ sub: user.id });
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Unable to register' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginCred = await loginByEmail(email);
    if (!loginCred) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await comparePasswords(password, loginCred.hash);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const user = await getUserByEmail(email);
    const token = generateToken({ sub: user.id });
    user.token = token;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Unable to login' });
  }
};

export { register, login };
