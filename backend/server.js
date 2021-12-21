const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();

const port = process.env.PORT;

mongoose.connect(process.env.DB).then(() => {
    console.log('Database Connnected\n');
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', '*');
    next();
});


app.use('/api', routes);

app.listen(port, () => {
    console.log("Serving on port " + port)
});