const apiRouter = require('express').Router();
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const photoRouter = require("./photoRouter.js");

apiRouter.route('/');

apiRouter.use("/photo", photoRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/posts', postRouter);

module.exports = apiRouter;
