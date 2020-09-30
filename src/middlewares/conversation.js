const {GroupConversation} = require('../models');

exports.isGroupAdmin = async (req, res, next) => {
  const userId = req.user._id;
  const conversationId = req.query.id;
  // check if user is a group admin
  const isAdmin = await GroupConversation
    .exists({_id: conversationId, admins: userId});

  if (!isAdmin) {
    return res.status(403).json({
      status: 403,
      message: 'Access Denied Not Authorized',
    });
  }

  next();
};
