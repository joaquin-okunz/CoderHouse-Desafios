import express from 'express'

import bodyParser from 'body-parser';

import ViewRouter from './routers/views/index.js';
import ApiRouter from './routers/js/index.js';

import {init} from "./BD/mongodb.js"
import cookieParser from 'cookie-parser';
import initPassport  from './config/passport.config.js';
import passport from 'passport';

init()
const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("./public"));
app.use(cookieParser())

app.set('view engine', 'hbs');
app.set('views', './views');

initPassport()
app.use(passport.initialize())

app.use('/', ViewRouter);
app.use('/api', ApiRouter);

app.use((err, req, res, next) => {
    console.error(err)
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message })
  })


export default app