const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations/');
const { authController } = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

router
  .route('/')
  .post(
    validate(authValidation.loginUser),
    catchAsync(authController.loginUser)
  );

module.exports = router;
