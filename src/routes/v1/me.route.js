const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {
  friendshipValidation,
  conversationValidation,
} = require('../../validations/');
const {
  friendshipController,
  userController,
  conversationController,
} = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = new express.Router();

// authenticate all
router.use(catchAsync(auth.authenticate));

router
  .route('/friend_requests')
  .get(
    validate(friendshipValidation.getFriendRequests),
    catchAsync(friendshipController.getFriendRequests)
  );

router
  .route('/profilePic')
  .post(
    userController.uploadImage,
    catchAsync(userController.updateProfilePic)
  );

router
  .route('/conversations')
  .get(
    validate(conversationValidation.getConversations),
    catchAsync(conversationController.getConversations)
  );

module.exports = router;
