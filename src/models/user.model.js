const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    index: true,
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
  friends: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    unique: true,
  }],
  isAdmin: Boolean,
});

const User = mongoose.model(
  'User',
  userSchema,
);


exports.User = User;
