const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {
  registerValidation,
  loginValidation,
  selectUsers,
  selectUserByEmail,
  deleteUserByEmail,
  patchUser
} = require('../models/userModel');

exports.userRegister = async (req, res, next) => {
  // Data Validation
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send({ msg: error.details[0].message });
  }
  // Check If email already exists
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    return res.status(400).send('Email already exists');
  }
  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    avatar: req.body.avatar
  });
  try {
    const savedUser = await user.save();
    res.status(201).send({ savedUser });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.userLogin = async (req, res, next) => {
  // Data Validation
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send({ msg: error.details[0].message });
  }
  // Check If email exists

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ msg: "Email doesn't exist" });
  }
  // Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({ msg: 'Invalid password' });

  // Create and assign a token

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res
    .status(200)
    .header('auth-token', token)
    .send(token);
};

// verifyToken

exports.verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ msg: 'Access Denied' });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

exports.posts = (req, res, next) => {
  res.status(200).send(req.user);
};

// Get all users

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then(users => res.status(200).send({ users }))
    .catch(err => console.log(err));
};

//Get user by email

exports.getUserByEmail = (req, res, next) => {
  selectUserByEmail(req.params)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch(err => res.status(err.status).send(err));
};

// Remove user from database

exports.removeUserByEmail = (req, res, next) => {
  deleteUserByEmail(req.params)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(err.status).send(err));
};

// Update user

exports.updateUser = async (req, res, next) => {
  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = {
    password: await bcrypt.hash(req.body.password, salt)
  };
  await patchUser(req.params, hashedPassword ? hashedPassword : req.body)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(err.status).send(err));
};
