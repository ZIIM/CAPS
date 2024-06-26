const handler = require('./handler.js');

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/caps');

socket.emit('join', {
  clientId: 'vendor',
  store: '1-206-flowers',
});

socket.on('join', console.log);

function makePayload() {
  const payload = handler();
  socket.emit('pickup', payload);
}

function delivered() {
  socket.on('delivered', () => {
    setTimeout(() => {
      console.log('VENDOR', 'Thank you for the delivery!');
    }, 1000);
  });
}

setInterval(() => {
  makePayload();
}, 5000);

delivered();