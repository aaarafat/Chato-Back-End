const {User} = require('./user.model');
const {FriendRequest} = require('./friendRequest.model');
const {
  Conversation,
  PrivateConversation,
  GroupConversation} = require('./conversation.model');

module.exports = {
  User,
  FriendRequest,
  Conversation,
  PrivateConversation,
  GroupConversation,
};
