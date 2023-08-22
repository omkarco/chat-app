// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
// Serve the static files (HTML, CSS, etc.)
app.use(express.static(__dirname + '/public'));

// Set up a connection event for new clients
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('chat message', (msg) => {
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    // Listen for disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
