const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    nicknames: {
      type: Map,
      of: String,
    },
    lastMessage: {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
    discriminatorKey: 'type',
  }
);

const groupConversationSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    trim: true,
  },
  photo: {
    type: String,
  },
  admins: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
});

conversationSchema.index({ updatedAt: 1 });

const Conversation = mongoose.model('Conversation', conversationSchema);

const GroupConversation = Conversation.discriminator(
  'group',
  groupConversationSchema
);

exports.Conversation = Conversation;
exports.GroupConversation = GroupConversation;
