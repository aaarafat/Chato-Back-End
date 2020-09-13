const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
  to: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  from: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // status (1 => pending, 2 => accepted, 3 => rejected)
  status: {
    type: Number,
    min: 1,
    default: 1,
    max: 3,
    required: true,
  },
});

friendRequestSchema.index({to: 1, from: 1}, {unique: 1});

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

exports.FriendRequest = FriendRequest;
