const {User} = require('./user.model');
const {Message} = require('./message.model');
const {FriendRequest} = require('./friendRequest.model');
const {
  Conversation,
  GroupConversation} = require('./conversation.model');

module.exports = {
  User,
  FriendRequest,
  Conversation,
  GroupConversation,
  Message
};
