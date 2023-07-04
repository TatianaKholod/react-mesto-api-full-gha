const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-error');
const { generateToken } = require('../utils/jwt');

const { HASH_SALT = 10 } = process.env;
const { COOKIE_MAXAGE = 3600000 * 24 * 7 } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          // хеши не совпали — отклоняем промис
          return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
        }
        return user._id;
      }))
    .then((id) => {
      const token = generateToken(id);
      // токен сохранили в httpOnly куку
      res.cookie('token', token, {
        maxAge: +COOKIE_MAXAGE,
        httpOnly: true,
      });
      return res.send({ _id: id });
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    password, email, name, about, avatar,
  } = req.body;
  return bcrypt.hash(password, +HASH_SALT)
    .then((hash) => User.create({
      password: hash, email, name, about, avatar,
    }))
    .then((user) => {
      const u = user.toJSON();
      delete u.password;
      res.status(201).send(u);
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
};
