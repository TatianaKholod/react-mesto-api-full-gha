const { Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const url = /^(https?:\/\/)?([\w\W\.]+)\.([a-z]{2,6}\.?)(\/[\w\W\.]*)*\/?$/i;

const ShemaId = {
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
};

const ShemaCard = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(url),
  }),
};
const ShemaLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(url),
  }),
};
const ShemaProfile = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};
const ShemaAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(url),
  }),
};

module.exports = {
  ShemaCard, ShemaLogin, ShemaProfile, ShemaId, ShemaAvatar,
};
