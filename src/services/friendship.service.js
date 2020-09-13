const {FriendRequest} = require('../models');
const socketService = require('../services/socket.service');
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
 * @return {Document} friend request
 */
exports.sendFriendRequest = async (to, from) => {
  // check if you sent a request
  let request = await FriendRequest
    .findOne({to: {$in: [to, from]}, from: {$in: [to, from]}});
  // console.log(request);

  // request is found
  if (request) {
    if (request.status === 1) { // pending
      throw new AppError('Cannot send a friend request', 400);
    } else if (request.status === 2) {
      throw new AppError('You already friends', 400);
    } else if (request.status === 3) {
      await FriendRequest.deleteOne(request._id);
    }
  }

  // create FriendRequest document
  request = await FriendRequest.create({
    to,
    from,
    status: 1, // requested status
  });
  // TODO
  // notify user
  socketService.notifyFriendRequest(to, request);
};

/**
 * Get Pending friend requests
 *
 * @author Abdelrahman Tarek
 *
 * @param {String} userId User ID
 * @param {Number} limit
 * @param {Number} offset
 * @return {Array<Document>} Requests
 */
exports.getFriendRequests = async (userId, limit, offset) => {
  const requests = await FriendRequest.find({to: userId, status: 1})
    .select('-to')
    .limit(limit)
    .skip(offset)
    .populate('from', '-friends -isAdmin');

  return requests;
};
