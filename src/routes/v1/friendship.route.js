const express = require('express');
const { auth, validate } = require('../../middlewares');
const { friendshipValidation } = require('../../validations/');
const { friendshipController } = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .post(
        catchAsync(auth.authenticate),
        validate(friendshipValidation.sendFriendRequest),
        catchAsync(friendshipController.sendFriendRequest)
    );

module.exports = router;
