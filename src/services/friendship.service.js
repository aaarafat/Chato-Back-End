const { FriendRequest, User } = require('../models');

/**
 * Send a friend request 
 * 
 * @author Abdelrahman Tarek
 * @public
 * @async
 * @function
 * @todo notify user
 * @param {String} to to user ID 
 * @param {String} from from user ID
 * @returns {Document} friend request
 */
exports.sendFriendRequest = async (to, from) => {
    // create FriendRequest document
    return await FriendRequest.create({
        to,
        from,
        status: 1 // requested status
    });
    // TODO
    // notify user
};