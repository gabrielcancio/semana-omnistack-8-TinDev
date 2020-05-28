const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://dev-gabriel-cancio:AK47762M4556@cluster0-08vwv.mongodb.net/omnistack8?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;