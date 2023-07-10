const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { PORT, CORS_ORIGIN, HOST_MONGODD } = require('./utils/settings');

const app = express();

app.use(cors({
  origin: [new RegExp(CORS_ORIGIN)],
  credentials: true,
}));

// глобальный обработчик ошибок, пока только сообщим о неотловленной ошибке
process.on('uncaughtException', (err, origin) => {
  // eslint-disable-next-line no-console
  console.log(`${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});

mongoose
  .connect(`mongodb://${HOST_MONGODD}/mestodb`, {
    useNewUrlParser: true,
    family: 4,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Подключились к БД ');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Ощибка подключения к БД ${err.message}`);
  });

app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер работает на порту ${PORT}`);
});
