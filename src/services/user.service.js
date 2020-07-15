const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const authService = require('./auth.service');

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.createUser = async (user) => {
  let userDoc = User({
    ...user,
    isAdmin: false,
  });
  userDoc.password = await authService.hashPassword(user.password);
  userDoc = await user.save();
  return _.pick(userDoc, ['_id', 'name', 'email']);
};
