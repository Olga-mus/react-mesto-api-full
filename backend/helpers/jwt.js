const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken

const SECRET_KEY = 'secret_key';
// payload - это то, что хотим зашифровать
// eslint-disable-next-line arrow-body-style
const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });// что хотим зашифровать и ключ
};

const checkToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
  console.log('token', token);
};

module.exports = {
  generateToken,
  checkToken,
};
