const { authService } = require('../services');

exports.authenticate = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied No Token Provided');
  try {
    req.user = await authService.verifyToken(token);
    next();
  } catch {
    return res.status(401).send('Access Denied Invalid Token');
  }
};

exports.authorize = async (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(403).send('Access Denied Not Authorized');
  next();
};
