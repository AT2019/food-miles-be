const userRouter = require('express').Router();
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const { getUsers } = require('../controllers/userController');

userRouter.use('/register', registerRouter);
userRouter.use('/login', loginRouter);
userRouter.get('/', getUsers);

module.exports = userRouter;
