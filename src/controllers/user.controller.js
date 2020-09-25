const {userService, authService} = require('../services');
const _ = require('lodash');

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({users});
};

exports.registerUser = async (req, res) => {
  let user = await userService.getUserByEmail(req.body.email);
  if (user) {
    return res.status(400).json({
      status: 400, message: 'This email is already registered ',
    });
  }

  user = _.pick(req.body, ['name', 'email', 'password', 'username']);
  user = await userService.createUser(user);

  // generate token
  const tokenPayload = {
    _id: user._id,
    isAdmin: user.isAdmin,
  };

  const token = await authService.generateToken(tokenPayload);
  // send user and token
  res.setHeader('x-auth-token', token);

  res.status(200).json({
    'user': _.pick(user, ['_id', 'name', 'email', 'username', 'profilePic']),
    'token': token,
  });
};


exports.getUserById = async (req, res) => {
  const id = req.params.id;
  // get user
  const user = await userService.getUserById(id);
  // if user = null then user is not found
  if (!user) {
    return res.status(404).json({
      status: 404, message: 'user is not found',
    });
  }

  res.status(200).json({user});
};


exports.changePassword = async (req, res) => {
  const {password, oldPassword} = req.body;

  let user = await userService.getUserById(req.user._id, {password: true});

  if (!user) {
    return res.status(404).json({
      status: 404, message: 'user is not found',
    });
  }

  const valid = await authService.verifyPassword(
    oldPassword,
    user.password,
  );
  if (!valid) {
    return res.status(400).json({
      status: 400, message: 'Invalid Password',
    });
  }

  // change password
  user = await userService.changePassword(user, password);

  // generate token
  const tokenPayload = {
    _id: user._id,
    isAdmin: user.isAdmin,
  };

  const token = await authService.generateToken(tokenPayload);
  // send user and token
  res.setHeader('x-auth-token', token);

  res.status(200).json({
    'user': _.pick(user, ['_id', 'name', 'email', 'username', 'profilePic']),
    'token': token,
  });
};
