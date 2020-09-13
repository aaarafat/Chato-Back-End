const express = require('express');
const validate = require('../../middlewares/validate');
const {searchValidation} = require('../../validations/');
const {searchController} = require('../../controllers');
const catchAsync = require('../../utils/catchAsync');

const router = new express.Router();

router
  .route('/users')
  .get(
    catchAsync(validate(searchValidation.userSearch)),
    catchAsync(searchController.userSearch),
  );

module.exports = router;
