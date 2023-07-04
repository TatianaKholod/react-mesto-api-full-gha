const router = require('express').Router();
const { celebrate, errors } = require('celebrate');
const cors = require('cors');
const { ShemaLogin } = require('../utils/celebrate');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const authMiddelware = require('../middlewares/auth');
const handleError = require('../middlewares/handleError');
const { createUser, login } = require('../controllers/auth');
const NotFoundError = require('../errors/not-found-error');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(cors({
  origin: 'http://localhost:3000/',
}));

router.use(requestLogger); // логгер запросов

router.post('/signin', celebrate(ShemaLogin), login);
router.post('/signup', celebrate(ShemaLogin), createUser);

router.use('/', authMiddelware);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => { next(new NotFoundError('URL неверный')); });

router.use(errorLogger); // логгер ошибок
router.use(errors()); // обработчик ошибок celebrate
router.use(handleError); // централизованный обработчик ошибок

module.exports = router;
