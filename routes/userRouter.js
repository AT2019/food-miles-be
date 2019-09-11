const userRouter = require('express').Router();
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const {
  getUsers,
  getUserByEmail,
  removeUserByEmail,
  updateUser
} = require('../controllers/userController');

userRouter.use('/register', registerRouter);
userRouter.use('/login', loginRouter);
userRouter.get('/', getUsers);
userRouter
  .route('/:email')
  .get(getUserByEmail)
  .delete(removeUserByEmail)
  .patch(updateUser);

module.exports = userRouter;
