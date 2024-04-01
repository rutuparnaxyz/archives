const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('./utils/winston')

const config = require('../config/common.config')
const sequelize = require('./db/sequelize').sequelize;
const router = require('./router')
const job = require('./utils/cron')

app.use(morgan('combined', { stream: winston.stream }));

sequelize.sync({ force: false });
//require('./db/initiate')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.SESSION.COOKIE_KEY]
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(router);
//job.start();

module.exports = app