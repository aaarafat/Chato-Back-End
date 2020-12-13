const {GroupConversation} = require('../models');

exports.isGroupAdmin = async (req, res, next) => {
  const userId = req.user._id;
  const conversationId = req.params.id;

  // check if there is a conversation with the given id
  const conversation = await GroupConversation
    .findById(conversationId);

  if(!conversation) {
    // conversation is not found
    return res.status(404).json({
      status: 404,
      message: 'Conversation is not found',
    });
  }

  // check if user is a group admin
  const isAdmin = conversation.admins.includes(userId);

  if (!isAdmin) {
    return res.status(403).json({
      status: 403,
      message: 'Access Denied Not Authorized',
    });
  }

  next();
};
