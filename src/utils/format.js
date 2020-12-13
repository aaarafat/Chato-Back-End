const _ = require('lodash');

exports.formatUser = (user) => {
  return _.omit(user.toObject(), ['password', 'friends', 'conversations']);
};
