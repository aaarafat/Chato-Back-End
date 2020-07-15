const { userService } = require('../services');
const AppError = require('../utils/AppError');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

exports.registerUser = async (req, res) => {
  let user = await userService.getUserByEmail(req.body.email);
  if (user) return res.status(400).send('This email is already registered ');

  user = _.pick(req.body, ['name', 'email', 'password']);
  user = userService.createUser(user);
  res.send(_.pick(user, ['_id', 'name', 'email']));
};
