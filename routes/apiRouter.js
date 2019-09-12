const apiRouter = require('express').Router();
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const photoRouter = require('./photoRouter.js');
const countryRouter = require('./countryRouter');
apiRouter.route('/');

apiRouter.use('/photo', photoRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/posts', postRouter);
apiRouter.use('/countries', countryRouter);

module.exports = apiRouter;
