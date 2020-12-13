const mongoose = require("mongoose");
const { isActive } = require("./../services/socket.service");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      index: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
      trim: true,
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
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    isAdmin: Boolean,
    conversations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Conversation",
      },
    ],
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
  }
);

userSchema.virtual("isActive").get(function () {
  return isActive(this._id);
});

const User = mongoose.model("User", userSchema);

exports.User = User;
