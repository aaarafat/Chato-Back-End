const {authService, userService} = require('../services');

exports.authenticate = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Access Denied No Token Provided',
    });
  }

  req.user = await authService.verifyToken(token);

  // check if user still exists
  const user = await userService.getUserById(req.user._id);
  if (!user) {
    return res.status(401).json({
      status: 401,
      message: 'The user belonging to this token does no longer exists.',
    });
  }

  req.user = user;
  next();
};

exports.authorize = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      status: 403,
      message: 'Access Denied Not Authorized',
    });
  }
  next();
};
