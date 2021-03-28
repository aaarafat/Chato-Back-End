const { messageService } = require('../services');

exports.sendMessage = async (req, res) => {
  const message = req.body.message;
  const conversationId = req.body.conversationId;
  const user = req.user;

  await messageService.sendMessage(user._id, conversationId, message);

  res.status(204).send();
};
