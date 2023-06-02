import { handleRegister, handleSignin } from '../../models/auth.model.js';

const httpRegister = async (req, res) => {
  try {
    const result = await handleRegister(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json('Unable to register');
  }
};

const httpSignin = async (req, res) => {
  try {
    const result = await handleSignin(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json('Login failed; Invalid email or password');
  }
};

export { httpRegister, httpSignin };
