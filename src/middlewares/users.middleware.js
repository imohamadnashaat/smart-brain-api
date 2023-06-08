const checkUserId = (req, res, next) => {
  try {
    const { id } = req.params;
    const { sub } = req.decoded; // User ID extracted from the decoded token

    if (id != sub) {
      return res.status(403).json({
        message: 'Forbidden: You are not authorized to access this user',
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export { checkUserId };
