const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const PORT = process.env.PORT || 4500;

const users = [{}];

app.get('/', (req, res) => {
    // res.send("Reaction when server works without any error😀")
    res.status(200).json({
        When: "Server runs",
        Without: "Any Errors",
        Reaction_be_Like: "😎",
    })
});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    // console.log("New Connection");

    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has Joined`) //delete
        socket.emit('welcome', { user: `${user}`, message: `welcome to the chat` });
        socket.broadcast.emit('userJoined', { user: `${user}`, message: ` has joined`, id: `${socket.id}` })
    });

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: `${users[socket.id]}`, message: ` has left`, id: `${socket.id}` });
        console.log(`${users[socket.id]} left the Chat`); //delete
        delete users[socket.id];
    });
});

app.use(cors);
server.listen(PORT, () => {
    console.log(`server started on: http://localhost:${PORT}/`)
});

