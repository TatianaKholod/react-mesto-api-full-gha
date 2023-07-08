const router = require('express').Router();
const { celebrate, errors } = require('celebrate');
const { ShemaLogin } = require('../utils/celebrate');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authMiddelware = require('../middlewares/auth');
const handleError = require('../middlewares/handleError');
const { createUser, login, logout } = require('../controllers/auth');
const NotFoundError = require('../errors/not-found-error');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger); // логгер запросов

// lkz Краш-тест сервера
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate(ShemaLogin), login);
router.post('/signup', celebrate(ShemaLogin), createUser);

router.use('/', authMiddelware);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.delete('/signin', logout); // для удаления куки

router.use('*', (req, res, next) => { next(new NotFoundError('URL неверный')); });

router.use(errorLogger); // логгер ошибок
router.use(errors()); // обработчик ошибок celebrate
router.use(handleError); // централизованный обработчик ошибок

module.exports = router;
