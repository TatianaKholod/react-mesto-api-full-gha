const router = require('express').Router();
const { celebrate } = require('celebrate');
const { ShemaCard, ShemaId } = require('../utils/celebrate');
const {
  getCards,
  delCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/', celebrate(ShemaCard), createCard);

router.get('/', getCards);

router.delete('/:id', celebrate(ShemaId), delCardById);

router.put('/:id/likes', celebrate(ShemaId), likeCard);

router.delete('/:id/likes', celebrate(ShemaId), dislikeCard);

module.exports = router;
