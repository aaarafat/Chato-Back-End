const mongoose = require('mongoose');

/**
 * Checks if the id is valid mongoose ObjectId
 *
 * @author Abdelrahman Tarek
 * @param {String} value id value to check
 * @param {Function} helpers
 * @return {String} value
 */
exports.idCheck = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid id');
  }
  return value;
};
