const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken

const { JWT_SECRET = 'dev-secret' } = process.env;

// payload - это то, что хотим зашифровать
// eslint-disable-next-line arrow-body-style
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }); // что хотим зашифровать и ключ
};

const checkToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  generateToken,
  checkToken,
};

// eslint-disable-next-line no-unused-vars

// const token = jwt.sign(
//   { _id: user._id },
//   NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
// );
