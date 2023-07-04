const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

const getUsers = (req, res, next) => User.find({})
  .then((user) => res.send(user))
  .catch(next);

const getProfile = (req, res) => res.redirect(`/users/${req.user._id}`);

const getUserById = (req, res, next) => {
  const { id: userId } = req.params;

  return User.findById(userId)
    .orFail(new NotFoundError('Объект не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, arrNeedfulKeys, next) => {
  const newDataUser = {};
  const userId = req.user._id;

  arrNeedfulKeys.forEach((key) => {
    newDataUser[key] = req.body[key];
  });

  return User.findByIdAndUpdate(userId, newDataUser, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(new NotFoundError('Объект не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  updateUser(req, res, ['avatar'], next);
};

const updateProfile = (req, res, next) => {
  updateUser(req, res, ['name', 'about'], next);
};

module.exports = {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getProfile,
};
