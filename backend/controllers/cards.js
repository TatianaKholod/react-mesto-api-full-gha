const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/Forbidden-error');

const getCards = (req, res, next) => Card.find({}).populate('likes').sort({ createdAt: -1 })
  .then((card) => res.send(card))
  .catch(next);

const delCardById = (req, res, next) => {
  const { id: cardId } = req.params;
  let cardDel = {};

  return Card.findById(cardId)
    .orFail(new NotFoundError('Объект не найден'))
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError('Объект не доступен'));
      }
      cardDel = card.toJSON();
      return Card.deleteOne({ _id: cardId });
    })
    .then(() => res.send(cardDel))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const toggleCard = (req, res, toggleKey, next) => {
  const userId = req.user._id;
  const { id: cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { [toggleKey]: { likes: userId } },
    { new: true },
  ).populate('likes')
    .orFail(new NotFoundError('Объект не найден'))
    .then((card) => res.send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  toggleCard(req, res, '$addToSet', next);
};

const dislikeCard = (req, res, next) => {
  toggleCard(req, res, '$pull', next);
};

module.exports = {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
};
