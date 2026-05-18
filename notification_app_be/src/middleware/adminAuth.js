const dotenv = require('dotenv');

dotenv.config();

const adminAuth = (req, res, next) => {
  const apiKey = req.headers['x-admin-key'] || req.query.adminKey;
  const expectedKey = process.env.ADMIN_API_KEY || 'secret-admin-key';

  if (!apiKey || apiKey !== expectedKey) {
    return res.status(403).json({ message: 'Forbidden: admin credentials required' });
  }

  next();
};

module.exports = adminAuth;
