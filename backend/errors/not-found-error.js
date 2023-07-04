const { ERROR_CODE_NOTFOUND } = require('./code-errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = ERROR_CODE_NOTFOUND;
  }
}

module.exports = NotFoundError;
