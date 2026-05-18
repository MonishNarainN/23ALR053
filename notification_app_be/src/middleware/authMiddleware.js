const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = { id: 'demo-user' };
  next();
};

module.exports = authMiddleware;
