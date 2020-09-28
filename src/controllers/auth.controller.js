const {authService, userService} = require('../services');
const _ = require('lodash');

exports.loginUser = async (req, res) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (!user) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid Email or Password',
    });
  }

  const valid = await authService.verifyPassword(
    req.body.password,
    user.password,
  );
  if (!valid) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid Email or Password',
    });
  }

  // generate token
  const tokenPayload = {
    _id: user._id,
    isAdmin: user.isAdmin,
  };

  const token = await authService.generateToken(tokenPayload);
  // send user and token
  res.setHeader('x-auth-token', token);

  res.status(200).json({
    'user': _.omit(user.toObject(), ['password', 'friends']),
    'token': token,
  });
};
