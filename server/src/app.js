import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import { messaging } from './firebaseInit'
const path = require('path')
const bodyParser = require('body-parser')
const postCharge = require('./stripe')
require('dotenv').config()

console.log(messaging)

const app = express()
const router = express.Router()

router.post('/stripe/charge', postCharge)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors('*'));
app.use('/v1', indexRouter);

app.use('/api', router)
// app.use(express.static(path.join(__dirname, '../build')))

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.stack });
});
export default app;
