const {userService} = require('../services');

exports.userSearch = async (req, res) => {
  const name = req.query.q;
  const {limit, offset} = req.query;
  const users = await userService.getUsersByName(name, limit, offset);

  res.status(200).json({users});
};
