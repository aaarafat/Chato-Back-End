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
 * @return {Document} friend request
 */
exports.sendFriendRequest = async (to, from) => {
  // check if you sent a request
  let request = await FriendRequest.findOne({
    to: { $in: [to, from] },
    from: { $in: [to, from] },
  });
  // console.log(request);

  // request is found
  if (request) {
    throw new AppError('Cannot send a friend request', 400);
  }

  const userExists = await User.exists({ _id: to });

  // user is not found
  if (!userExists) {
    throw new AppError('User is not found', 404);
  }

  // create FriendRequest document
  request = await FriendRequest.create({
    to,
    from,
  });
  // TODO
  // notify user
  const socketService = require('./socket.service.js');
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
  const requests = await FriendRequest.find({ to: userId })
    .sort({ createdAt: -1 })
    .select('-to')
    .limit(limit)
    .skip(offset)
    .populate('from', '-friends -isAdmin');

  return requests;
};

exports.acceptFriendRequest = async (requestId) => {
  const request = await FriendRequest.findById(requestId);

  const conversationService = require('./conversation.service.js');
  const conversation = await conversationService.createPrivateConversation([
    request.from,
    request.to,
  ]);

  // no request found
  if (!request) throw new AppError('The Request is not found', 404);

  await Promise.all([
    User.findByIdAndUpdate(request.to, {
      $addToSet: {
        friends: { friend: request.from, conversation: conversation._id },
      },
    }),
    User.findByIdAndUpdate(request.from, {
      $addToSet: {
        friends: { friend: request.to, conversation: conversation._id },
      },
    }),
    request.remove(),
  ]);
};

exports.rejectFriendRequest = async (requestId) => {
  const request = await FriendRequest.findById(requestId);

  // no request found
  if (!request) throw new AppError('The Request is not found', 404);

  await request.remove();
};
