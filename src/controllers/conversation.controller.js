const { conversationService, messageService } = require('../services');

exports.createGroupConversation = async (req, res) => {
  // get creator (admin) user
  const user = req.user;

  const members = req.body.members;

  // create conversation
  const conversation = await conversationService.createGroupConversation(
    user._id,
    members
  );

  res.status(200).json({ conversation });
};

exports.deleteGroupConversation = async (req, res) => {
  const groupId = req.params.id;

  // delete Group Conversation
  await conversationService.deleteGroupConversationById(groupId);
  res.status(204).send();
};

exports.getConversations = async (req, res) => {
  const user = req.user;

  const { limit, offset } = req.query;

  const conversationIDs = user.conversations;

  const conversations = await conversationService.getConversationsByIDs(
    conversationIDs,
    limit,
    offset
  );

  res.status(200).json({
    conversations,
  });
};

exports.getConversationById = async (req, res) => {
  const userId = req.user._id;
  const conversationId = req.params.id;

  const conversation = await conversationService.getConversationById(
    conversationId
  );

  if (!conversation || conversation.length === 0) {
    return res.status(404).json({
      status: 404,
      message: 'No Conversation with the given ID',
    });
  }

  const isMember = conversation.members.includes(userId);

  if (!isMember) {
    return res.status(403).json({
      status: 403,
      message: 'Access Denied Not Authorized',
    });
  }

  res.status(200).json({
    conversation,
  });
};

exports.getConversationMessages = async (req, res) => {
  const userId = req.user._id;
  const conversationId = req.params.id;

  const { limit, offset } = req.query;

  const messages = await messageService.getMessages(
    userId,
    conversationId,
    limit,
    offset
  );

  res.status(200).json({
    messages,
  });
};
