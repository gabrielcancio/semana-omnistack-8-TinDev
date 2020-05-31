const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const routes = require('./routes');

const app = express();

const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://dev-gabriel-cancio:AK47762M4556@cluster0-08vwv.mongodb.net/omnistack8?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 });

 const connectedUsers = {}

 io.on('connection', socket => {
     const { user } = socket.handshake.query;

     connectedUsers[user] = socket.id
});

 app.use((request, response, next) => {
    request.io = io;
    request.connectedUsers = connectedUsers;

    return next();
 });

app.use(cors());
app.use(express.json());
app.use(routes);

exports.config = { 
    app,
    server
 };