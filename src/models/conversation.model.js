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

const groupConversationSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    trim: true,
  },
  photo: {
    type: String,
  },
  admins: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

const GroupConversation = Conversation
  .discriminator('group', groupConversationSchema);

exports.Conversation = Conversation;
exports.GroupConversation = GroupConversation;
