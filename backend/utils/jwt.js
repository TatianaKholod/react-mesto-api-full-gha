const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRES } = require('./settings');

const generateToken = (id) => jwt.sign({ _id: id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { generateToken, verifyToken };
