const { Message, Conversation } = require('../models');
const AppError = require('../utils/AppError');
/**
 * Send new message
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {String} sender sender user ID
 * @param {String} conversationId conversation ID
 * @param {String} message message string
 * @returns {Document | null} message
 */
exports.sendMessage = async (sender, conversationId, message) => {
  // TODO
  // update conversation
  const conversation = await Conversation.findOne({
    _id: conversationId,
    members: { $in: [sender] },
  });

  if (!conversation) throw new AppError('Conversation Not Found', 404);

  const newMessage = await Message.create({
    sender: sender,
    conversation: conversationId,
    message: message,
  });

  conversation.lastMessage = newMessage._id;
  await conversation.save();

  return newMessage;
};

/**
 * Get messages from conversation
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {String} conversationId conversation ID
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Document | null} message
 */

exports.getMessages = async (userId, conversationId, limit, offset) => {
  const messages = await Message.find({ conversation: conversationId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(offset);
  return messages;
};
