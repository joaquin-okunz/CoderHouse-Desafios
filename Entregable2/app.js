import express from 'express'

import bodyParser from 'body-parser';

import ViewRouter from './routers/views/index.js';
import ApiRouter from './routers/js/index.js';

import {init} from "./BD/mongodb.js"

init()

const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("./public"));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', ViewRouter);
app.use('/api', ApiRouter);


export default app