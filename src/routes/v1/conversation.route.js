const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const catchAsync = require('../../utils/catchAsync');
const {conversationController} = require('../../controllers');
const {conversationValidation} = require('../../validations');

const router = new express.Router();


router
  .route('/')
  .post(
    catchAsync(auth.authenticate),
    catchAsync(validate(conversationValidation.createConversation)),
    catchAsync(conversationController.createGroupConversation),
  );

module.exports = router;
