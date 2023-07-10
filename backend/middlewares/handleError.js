const mongoose = require('mongoose');
const { ERROR_CODE_BADREQ, ERROR_CODE_DB, EROR_CODE_CONFLICT } = require('../errors/code-errors');

const mapError = (err) => Object.values(err.errors)
  .map((i) => i.message)
  .join(', ');

const checkError = (err) => {
  const definiteErr = {};
  switch (true) {
    case (err instanceof mongoose.Error.ValidationError):
      definiteErr.status = ERROR_CODE_BADREQ;
      if (err.errors) {
        // если несколько полей не прошли валидацию, то нужно вывести все ошибки
        definiteErr.message = { message: mapError(err) };
      } else definiteErr.message = { message: err.message };
      break;
    case (err instanceof mongoose.Error.CastError):
      definiteErr.status = ERROR_CODE_BADREQ;
      definiteErr.message = { message: err.message };
      break;
    case (err.code === 11000):
      definiteErr.status = EROR_CODE_CONFLICT;
      definiteErr.message = { message: err.message };
      break;
    default:
      definiteErr.status = ERROR_CODE_DB;
      definiteErr.message = { message: 'На сервере произошла ошибка' }; // errorLogger сохранит err.message в лог
      break;
  }
  return definiteErr;
};

const handleError = ((err, req, res, next) => {
  if (err.statusCode) { res.status(err.statusCode).send({ message: err.message }); } else {
    const definiteErr = checkError(err);
    res.status(definiteErr.status).send(definiteErr.message);
  }
  next();
});

module.exports = handleError;
