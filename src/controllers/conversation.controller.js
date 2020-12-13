const {conversationService} = require('../services');

exports.createGroupConversation = async (req, res) => {
  // get creator (admin) user
  const user = req.user;

  const members = req.body.members;

  // create conversation
  const conversation = await conversationService
    .createGroupConversation(user._id, members);

  res.status(200).json({conversation});
};


exports.deleteGroupConversation = async (req, res) => {
  const groupId = req.params.id;

  // delete Group Conversation
  await conversationService
    .deleteGroupConversationById(groupId);
  res.status(204).send();
};