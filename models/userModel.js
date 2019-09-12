const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const registerValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };

  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

const userDB = mongoose.model('User', userSchema);

const selectUsers = () => {
  return userDB.find().then(users => users);
};

const selectUserByEmail = ({ email }) => {
  return userDB.find({ email }).then(user => {
    if (user.length === 0) {
      return Promise.reject({ status: 404, msg: 'Email Not Found' });
    } else return user;
  });
};

const deleteUserByEmail = ({ email }) => {
  return userDB.deleteOne({ email }).then(res => {
    if (res.deletedCount === 0) {
      return Promise.reject({ status: 404, msg: 'Email Not Found' });
    }
  });
};

const patchUser = ({ email }, data) => {
  console.log(data);
  return userDB.updateOne({ email: email }, data).then(res => {
    if (res.nModified === 0) {
      return Promise.reject({ status: 404, msg: 'Email Not Found' });
    } else return res;
  });
};

module.exports = mongoose.model('User', userSchema);
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.selectUsers = selectUsers;
module.exports.selectUserByEmail = selectUserByEmail;
module.exports.deleteUserByEmail = deleteUserByEmail;
module.exports.patchUser = patchUser;
