const {
  GroupConversation,
} = require('../models');

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
exports.createGroupConversation = async (adminId, members) => {
  const conversation = GroupConversation.create({
    members: [...members, adminId],
    admins: [adminId],
  });

  return await conversation;
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
exports.deleteGroupConversationById = async (groupId) => {
  const res = await GroupConversation.findByIdAndDelete(groupId);

  return res;
};