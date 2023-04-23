import path from "path";
import express from 'express'
import expressSession from "express-session"
import passport from "passport";
import MongoStore from "connect-mongo";
import { fileURLToPath } from "url";

import bodyParser from 'body-parser';

import ViewRouter from './routers/views/index.js';
import ApiRouter from './routers/js/index.js';

import { init } from "./BD/mongodb.js"
import initPassport from "./config/passport.config.js"

await init()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("./public"));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(expressSession({
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    mongoOptions: {},
    ttl: 20,
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
}))

initPassport()

app.use(passport.initialize())
app.use(passport.session())

app.use('/', ViewRouter);
app.use('/api', ApiRouter);


export default app