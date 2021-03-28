const express = require('express');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations/');
const { authController } = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = new express.Router();

router
  .route('/')
  .post(
    catchAsync(validate(authValidation.loginUser)),
    catchAsync(authController.loginUser)
  );

module.exports = router;
