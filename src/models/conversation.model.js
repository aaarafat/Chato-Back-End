const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],
  nicknames: {
    type: Map,
    of: String,
  },
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  toObject: {
    virtuals: true,
    getters: true,
  },
  discriminatorKey: 'type',
});

const Conversation = mongoose.model('Conversation', conversationSchema);

exports.Conversation = Conversation;
