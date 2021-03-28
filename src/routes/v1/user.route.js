const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation, friendshipValidation } = require('../../validations/');
const { userController, friendshipController } = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = new express.Router();

router
  .route('/:id/friends')
  .post(
    catchAsync(auth.authenticate),
    catchAsync(validate(friendshipValidation.FriendRequestId)),
    catchAsync(friendshipController.sendFriendRequest)
  );

router
  .route('/')
  .get(
    catchAsync(auth.authenticate),
    catchAsync(auth.authorize),
    catchAsync(userController.getAllUsers)
  )
  .post(
    catchAsync(validate(userValidation.registerUser)),
    catchAsync(userController.registerUser)
  );

router
  .route('/:id')
  .get(
    catchAsync(validate(userValidation.getUserById)),
    catchAsync(userController.getUserById)
  );

router
  .route('/password')
  .patch(
    catchAsync(auth.authenticate),
    catchAsync(validate(userValidation.changePassword)),
    catchAsync(userController.changePassword)
  );

module.exports = router;
