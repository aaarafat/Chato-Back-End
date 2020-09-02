const { User } = require('../models');
const _ = require('lodash');
const authService = require('./auth.service');

exports.getUserByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

exports.createUser = async (user) => {
  let userDoc = User({
    ...user,
    isAdmin: false,
  });
  userDoc.password = await authService.hashPassword(user.password);
  await userDoc.save();
  return _.pick(userDoc, ['_id', 'name', 'email']);
};

exports.getAllUsers = async () => {
  return await User.find();
};