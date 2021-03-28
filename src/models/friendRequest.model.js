const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  }
);

friendRequestSchema.index({ createdAt: -1 });
friendRequestSchema.index({ to: 1, from: 1 }, { unique: 1 });

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

exports.FriendRequest = FriendRequest;
