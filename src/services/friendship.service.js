const { FriendRequest, User } = require('../models');
const AppError = require('../utils/AppError');

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
    // check if you sent a request
    const request = await FriendRequest.findOne({ to: { $in: [to, from] }, from: { $in: [to, from] } });
    // sconsole.log(request);

    // request is found
    if (request) {
        switch (request.status) {
            case 1: // pending
                throw new AppError()
                break;
            case 2: // accepted

                break;
            case 3: // rejected

                break;
            default:
                break;
        }
    }

    // create FriendRequest document
    return await FriendRequest.create({
        to,
        from,
        status: 1 // requested status
    });
    // TODO
    // notify user
};