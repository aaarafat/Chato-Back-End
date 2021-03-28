const express = require('express');
const { auth, validate } = require('../../middlewares');
const { messageValidation } = require('../../validations');
const { messageController } = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = new express.Router();

router
  .route('/')
  .post(
    catchAsync(auth.authenticate),
    catchAsync(validate(messageValidation.sendMessage)),
    catchAsync(messageController.sendMessage)
  );

module.exports = router;
