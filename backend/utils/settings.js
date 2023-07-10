require('dotenv').config();

const { PORT = 3000 } = process.env;
const { CORS_ORIGIN = 'http://localhost:3000' } = process.env;
const { HOST_MONGODD = 'localhost:27017' } = process.env;
const { HASH_SALT = 10 } = process.env;
const { COOKIE_MAXAGE = 3600000 * 24 * 7 } = process.env;
const { JWT_SECRET = 'default-secret' } = process.env;
const { JWT_EXPIRES = '7d' } = process.env;

module.exports = {
  PORT,
  CORS_ORIGIN,
  HOST_MONGODD,
  HASH_SALT,
  COOKIE_MAXAGE,
  JWT_SECRET,
  JWT_EXPIRES,
};
