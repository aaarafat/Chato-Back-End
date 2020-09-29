const {userService} = require('../services');

exports.userSearch = async (req, res) => {
  const user = req.user;
  const {q, limit, offset} = req.query;

  const users = await userService.getUsersByName(user.friends, q, limit, offset);

  res.status(200).json({users});
};

exports.friendSearch = async (req, res) => {
  const user = req.user;
  const {q, limit, offset} = req.query;

  const friends = await userService.getFriends(user._id, q, limit, offset);

  res.status(200).json({'friends': friends.friends});
};
