const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
const session = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
require('dotenv').config();

const app = express();

const port = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(session({
    secret: 'some secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:oneDay}
}));

mongoose.connect(process.env.DB).then(() => {
    console.log('Database Connnected\n');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Set-cookie');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use('/api', routes);

app.listen(port, () => {
    console.log("Serving on port " + port)
});