const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {friendshipValidation} = require('../../validations/');
const {friendshipController} = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = new express.Router();

// authenticate all
router.use(catchAsync(auth.authenticate));

router
  .route('/friend_requests')
  .get(
    validate(friendshipValidation.getFriendRequests),
    catchAsync(friendshipController.getFriendRequests),
  );

module.exports = router;
