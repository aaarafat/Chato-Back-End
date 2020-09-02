const { userService, authService } = require('../services');
const AppError = require('../utils/AppError');
const _ = require('lodash');

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.send({users});
};

exports.registerUser = async (req, res) => {
  let user = await userService.getUserByEmail(req.body.email);
  if (user) return res.status(400).send('This email is already registered ');

  user = _.pick(req.body, ['name', 'email', 'password']);
  user = await userService.createUser(user);

  // generate token
  const tokenPayload = {
    _id: user._id,
    isAdmin: user.isAdmin,
  };

  const token = await authService.generateToken(tokenPayload);
  // send user and token
  res.send({
    'user': _.pick(user, ['_id', 'name', 'email']),
    'token': token
  });
};


exports.getUserById = async (req, res) => {
  const id = req.params.id;
  // get user
  let user = await userService.getUserById(id);
  // if user = null then user is not found
  if (!user) return res.status(404).send('user is not found');

  res.send({user});
};