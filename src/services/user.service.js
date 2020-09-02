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

/**
 * Get user by `id`
 * 
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {String} userId - User ID
 * @summary Get user by `id`
 * @returns {Document} `user` if user is found
 * @returns {null} `null` if user is not found
 */
exports.getUserById = async (userId) => {
  return await User.findById(userId);
};