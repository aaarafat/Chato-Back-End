const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations/');
const { userController } = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');
const { authService } = require('../../services');

const router = express.Router();

const friendshipRouter = require('./friendship.route');

// users/:id/friends
router.use('/:id/friends', friendshipRouter);

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

router
  .route('/:id')
  .get(
    validate(userValidation.getUserById),
    catchAsync(userController.getUserById)
  );

router
  .route('/password')
  .patch(
    catchAsync(auth.authenticate),
    validate(userValidation.changePassword),
    catchAsync(userController.changePassword)
  );

module.exports = router;
