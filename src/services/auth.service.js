const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

getPrivateKey = () => {
  return config.get('JWT_KEY');
};

exports.verifyPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

exports.verifyToken = async (token) => {
  const privateKey = getPrivateKey();
  return jwt.verify(token, privateKey);
};

exports.generateToken = async (payload) => {
  const privateKey = getPrivateKey();
  const options = {
    expiresIn: config.get('JWT_EXPIRES_IN'),
  };
  return jwt.sign(payload, privateKey, options);
};

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(user.password, salt);
};
