const express = require('express');

const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const searchRouter = require('./search.route');
const meRouter = require('./me.route');
const friendRequestRouter = require('./friendRequest.route');

const router = new express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/search', searchRouter);
router.use('/me', meRouter);
router.use('/friend_requests', friendRequestRouter);

module.exports = router;
