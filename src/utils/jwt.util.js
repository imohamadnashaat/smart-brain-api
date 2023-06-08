import 'dotenv/config';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (payload, expiresIn = '2w') => {
  const token = jwt.sign({ ...payload, role: 'user' }, SECRET_KEY, {
    expiresIn,
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const formattedToken = formatToken(token);
    const decoded = jwt.verify(formattedToken, SECRET_KEY);
    return decoded;
  } catch (err) {
    throw err;
  }
};

const formatToken = (token) => {
  if (token.startsWith('Bearer ')) {
    return token.slice(7);
  }
  return token;
};

export { generateToken, verifyToken };
