const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())

dotenv.config({ path: './config.env' });
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello app');
});

app.get('/signin', (req, res) => {
    res.send('hello login');
});

app.get('/signup', (req, res) => {
    res.send('hello registration');
});

app.listen(PORT, () => {
    console.log(`server is running at port number ${PORT}`);
});