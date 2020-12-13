const { GroupConversation, User } = require("../models");
const { Conversation } = require("../models/conversation.model");

/**
 * Add conversationId to users
 *
 * @function
 * @private
 * @async
 * @author Abdelrahman Tarek
 * @param {Array<String>} userIds user IDs array
 * @param {String} conversationId conversation ID
 */
addConversationToUsers = async (userIds, conversationId) => {
  return await User.updateMany(
    { _id: { $in: userIds } },
    { $addToSet: { conversations: conversationId } }
  );
};

/**
 * Remove conversationId from users
 *
 * @function
 * @private
 * @async
 * @author Abdelrahman Tarek
 * @param {Array<String>} userIds user IDs array
 * @param {String} conversationId conversation ID
 */
removeConversationFromUsers = async (userIds, conversationId) => {
  return await User.updateMany(
    { _id: { $in: userIds } },
    { $pull: { conversations: conversationId } }
  );
};

/**
 * Create Group Conversation
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {String} adminId Admin user ID
 * @param {Array<string>} members Members IDs
 * @return {Document} conversation
 */
createGroupConversation = async (adminId, members) => {
  members = [...members, adminId];

  const conversation = await GroupConversation.create({
    members: members,
    admins: [adminId],
  });

  // add conversation to all memebers
  Promise.all([addConversationToUsers(members, conversation._id)]);

  return conversation;
};

/**
 * Delete Group Conversation By ID
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {String} groupId Group Conversation ID to be deleted
 * @returns {Document} Deleted conversation
 */
deleteGroupConversationById = async (groupId) => {
  const conversation = await GroupConversation.findByIdAndDelete(groupId);

  // remove conversation from all memebers
  Promise.all([
    removeConversationFromUsers(conversation.members, conversation._id),
  ]);

  return conversation;
};

/**
 * Get Conversation By ID
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {String} conversationId conversation ID
 * @returns {Document} conversation
 */
getConversationById = async (conversationId) => {
  const conversation = await Conversation.findById(conversationId);
  return conversation;
};

/**
 * Get Conversations By IDs
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {Array<String>} conversationIDs
 * @returns {Array<Document>} conversations
 */
getConversationsByIDs = async (conversationIDs) => {
  return await Promise.all([...conversationIDs.map(getConversationById)]);
};

module.exports = {
  getConversationsByIDs,
  getConversationById,
  deleteGroupConversationById,
  createGroupConversation,
};
