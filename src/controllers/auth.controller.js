const { authService, userService } = require('../services');
const AppError = require('../utils/AppError');

exports.loginUser = async (req, res) => {
  const user = userService.getUserByEmail(req.body.email);
  if (!user) return res.status(400).send('Invalid Email or Password');

  const valid = await authService.verifyPassword(
    req.body.password,
    user.password
  );
  if (!valid) return res.status(400).send('Invalid Email or Password');

  const tokenPayload = {
    _id: user._id,
    isAdmin: user.isAdmin,
  };
  const token = await authService.generateToken(tokenPayload);
  res.send(token);
};
