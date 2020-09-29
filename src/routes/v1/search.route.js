const express = require('express');
const {auth} = require('./../../middlewares');
const validate = require('../../middlewares/validate');
const {searchValidation} = require('../../validations/');
const {searchController} = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = new express.Router();

router
  .route('/users')
  .get(
    catchAsync(auth.authenticate),
    catchAsync(validate(searchValidation.search)),
    catchAsync(searchController.userSearch),
  );

router
  .route('/friends')
  .get(
    catchAsync(auth.authenticate),
    catchAsync(validate(searchValidation.search)),
    catchAsync(searchController.friendSearch),
  );

module.exports = router;
