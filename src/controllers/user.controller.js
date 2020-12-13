const { userService, authService } = require("../services");
const AppError = require("./../utils/AppError");
const multer = require("multer");
const { formatUser } = require("../utils/format");
const _ = require("lodash");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${req.user.username}_${req.user._id}_${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1].match(/(png|jpg|jpeg)/)) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImage = upload.single("image");

exports.updateProfilePic = async (req, res) => {
  // if no image file in request throw error
  if (!req.file) {
    throw new AppError("Please Upload a file!", 400);
  }

  // update profilePic
  const user = await userService.updateProfilePic(req.user, req.file.path);

  res.status(200).json({ user: formatUser(user) });
};

exports.getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ users });
};

exports.registerUser = async (req, res) => {
  let user = _.pick(req.body, ["name", "email", "password", "username"]);
  user = await userService.createUser(user);

  // generate token
  const tokenPayload = {
    _id: user._id,
    isAdmin: user.isAdmin,
  };

  const token = await authService.generateToken(tokenPayload);
  // send user and token
  res.setHeader("x-auth-token", token);

  res.status(200).json({
    user: formatUser(user),
    token: token,
  });
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  // get user
  const user = await userService.getUserById(id);
  // if user = null then user is not found
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "user is not found",
    });
  }

  res.status(200).json({
    user: formatUser(user),
  });
};

exports.changePassword = async (req, res) => {
  const { password, oldPassword } = req.body;

  let user = await userService.getUserById(req.user._id, { password: true });

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "user is not found",
    });
  }

  const valid = await authService.verifyPassword(oldPassword, user.password);
  if (!valid) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Password",
    });
  }

  // change password
  user = await userService.changePassword(user, password);

  // generate token
  const tokenPayload = {
    _id: user._id,
    isAdmin: user.isAdmin,
  };

  const token = await authService.generateToken(tokenPayload);
  // send user and token
  res.setHeader("x-auth-token", token);

  res.status(200).json({
    user: formatUser(user),
    token: token,
  });
};
