const {User} = require('../models');
const authService = require('./auth.service');

exports.getUserByEmail = async (email) => {
  return await User.findOne({email}).select('+password');
};

exports.createUser = async (user) => {
  const userDoc = new User({
    ...user,
    isAdmin: false,
  });
  userDoc.password = await authService.hashPassword(user.password);
  await userDoc.save();
  return userDoc;
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
 * @param {Object} ops
 * @param {Boolean} [ops.password] if true will select password(Default `false`)
 * @summary Get user by `id`
 * @return {Document} `user` if user is found
 * @return {null} `null` if user is not found
 */
exports.getUserById = async (userId, ops = {password: false}) => {
  if (ops.password) {
    return await User.findById(userId).select('+password');
  } else {
    return await User.findById(userId);
  }
};


/**
 * Get users by `name`
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {Array<String>} friends
 * @param {String} name - User name
 * @param {Number} limit
 * @param {Number} offset
 * @summary Get user by `name`
 * @return {Array<Document>} `users`
 */
exports.getUsersByName = async (friends, name, limit, offset) => {
  return await User.find({
    'name': {'$regex': name, '$options': 'i'},
    '_id': {$nin: friends},
  }).limit(limit).skip(offset);
};


/**
 * Change user password
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {Document} user user
 * @param {String} newPassword new password
 * @summary Change user password
 * @return {Document} `user`
 */
exports.changePassword = async (user, newPassword) => {
  user.password = await authService.hashPassword(newPassword);
  await user.save();
  return user;
};


/**
 * Get user's friends by `name`
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {String} id
 * @param {String} name - Friend name
 * @param {Number} limit
 * @param {Number} offset
 * @summary Get user's friends by `name`
 * @return {Array<Document>} `users`
 */
exports.getFriends = async (id, name, limit, offset) => {
  return await User.findById(id).select('friends')
    .populate({
      path: 'friends',
      match: {'name': RegExp(name, 'i')},
      select: '-friends',
    });
};
