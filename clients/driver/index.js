const handler = require('./handler.js');
const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000/caps');

socket.emit('join', {
  clientId: 'driver',
  store: '1-206-flowers',
});

socket.on('join', console.log);

function listen() {
  socket.on('pickup', (payload) => handler.transit(socket, payload));
  socket.on('inTransit', (payload) => handler.delivered(socket, payload));
}

listen();