const express = require('express');

const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const searchRouter = require('./search.route');

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/search', searchRouter);

module.exports = router;
