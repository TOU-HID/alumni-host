const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  const { authorization } = req.header;
  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret_sign);
    const { name, userId } = decoded;
    req.name = name;
    req.userId = userId;
    next();
  } catch {
    next('Authentication failure!');
  }
};

module.exports = checkAuth;
