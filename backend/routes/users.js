const router = require('express').Router();
const { celebrate } = require('celebrate');
const { ShemaProfile, ShemaAvatar, ShemaId } = require('../utils/celebrate');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getProfile,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getProfile);
router.get('/:id', celebrate(ShemaId), getUserById);

router.patch('/me', celebrate(ShemaProfile), updateProfile);
router.patch('/me/avatar', celebrate(ShemaAvatar), updateAvatar);

module.exports = router;
