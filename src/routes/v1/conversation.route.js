const express = require('express');
const auth = require('../../middlewares/auth');
const conversationMiddleware = require('../../middlewares/conversation');
const validate = require('../../middlewares/validate');
const catchAsync = require('../../utils/catchAsync');
const { conversationController } = require('../../controllers');
const { conversationValidation } = require('../../validations');

const router = new express.Router();

router
  .route('/')
  .post(
    catchAsync(auth.authenticate),
    catchAsync(validate(conversationValidation.createConversation)),
    catchAsync(conversationController.createGroupConversation)
  );

router
  .route('/:id')
  .delete(
    catchAsync(auth.authenticate),
    catchAsync(validate(conversationValidation.conversationId)),
    catchAsync(conversationMiddleware.isGroupAdmin),
    catchAsync(conversationController.deleteGroupConversation)
  )
  .get(
    catchAsync(auth.authenticate),
    catchAsync(validate(conversationValidation.conversationId)),
    catchAsync(conversationController.getConversationById)
  );

router
  .route('/:id/messages')
  .get(
    catchAsync(auth.authenticate),
    catchAsync(validate(conversationValidation.getConversationMessages)),
    catchAsync(conversationMiddleware.isConversationMember),
    catchAsync(conversationController.getConversationMessages)
  );

module.exports = router;
