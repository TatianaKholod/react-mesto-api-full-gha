const { EROR_CODE_FORBIDDEN } = require('./code-errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = EROR_CODE_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
