/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const usersRouter = require('./routes/usersRoutes');
const roomsRouter = require('./routes/roomsRoutes');
const petsRouter = require('./routes/petsRoutes');
const stripeRouter = require('./routes/stripeRoutes');

const app = express();
const { PORT, SECRET_KEY_SESSION } = process.env;

const sessionConfig = {
  name: 'cookiesFinalOchka',
  store: new FileStore(),
  secret: SECRET_KEY_SESSION ?? 'ZooHotel',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 1000 * 60 * 60,
    httpOnly: true,
  },
};
const corsConfig = {
  credentials: true,
  origin: true,
  optionsSuccesStatus: 200,
};

app.use(cors(corsConfig));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api/user', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/pets', petsRouter);
app.use('/api/stripe', stripeRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
