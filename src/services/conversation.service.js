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
