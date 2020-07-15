const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations/');
const { userController } = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = express.Router();

router
  .route('/')
  .get(
    catchAsync(auth.authenticate),
    catchAsync(auth.authorize),
    catchAsync(userController.getAllUsers)
  )
  .post(
    validate(userValidation.registerUser),
    catchAsync(userController.registerUser)
  );

module.exports = router;
