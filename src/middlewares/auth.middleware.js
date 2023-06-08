import { verifyToken } from '../utils/jwt.util.js';

// Middleware function to verify JWT token
const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = verifyToken(token);

    // Store the decoded token in the request object for later use
    req.decoded = decoded;
    next();
  } catch (err) {
    if (err.message === 'jwt expired') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export { verifyTokenMiddleware };
