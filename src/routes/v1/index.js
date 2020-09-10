const express = require('express');

const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const searchRouter = require('./search.route');
const meRouter = require('./me.route');

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/search', searchRouter);
router.use('/me', meRouter);

module.exports = router;
