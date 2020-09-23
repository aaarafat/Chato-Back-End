const express = require('express');
const {auth, validate} = require('../../middlewares');
const {friendshipValidation} = require('../../validations');
const {friendshipController} = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = new express.Router();

router
  .route('/:id/accept')
  .post(
    catchAsync(auth.authenticate),
    validate(friendshipValidation.FriendRequestId),
    catchAsync(friendshipController.acceptFriendRequest),
  );

module.exports = router;
