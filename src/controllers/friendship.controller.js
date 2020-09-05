const { friendshipService } = require('../services');

exports.sendFriendRequest = async (req, res) => {
    const to = req.params.id;

    // check if you sent request to yourself
    if (req.user._id == to) return res.status(400).json({ status: 400, message: 'You cannot send a friend request to yourself' });

    // check if already friends
    if (to in req.user.friends) return res.status(400).json({ status: 400, message: 'You already friends' });

    // send request
    await friendshipService.sendFriendRequest(to, req.user._id);

    res.status(200).send();
};