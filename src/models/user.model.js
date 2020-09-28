const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    index: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
    select: false,
  },
  profilePic: {
    type: String,
  },
  friends: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],
  isAdmin: Boolean,
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  toObject: {
    virtuals: true,
    getters: true,
  },
});

userSchema.virtual('isActive').get( function() {
  const {socketService} = require('./../services');
  return socketService.isActive(this._id);
});

const User = mongoose.model(
  'User',
  userSchema,
);


exports.User = User;
