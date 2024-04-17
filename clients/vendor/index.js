const newPackage = require('./handler.js');

const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000/caps');

socket.emit('join', {
  clientId: 'vendor',
  store: '1-206-flowers',
});

socket.on('join', console.log);

function makePayload() {
  let payload = newPackage();
  socket.emit('pickup', payload);
}

function delivered() {
  setTimeout(() => {
    socket.on('delivered', () => {
      setTimeout(() => {
        console.log('VENDOR', 'Thank you for the delivery!');
      }, 2000);
    });
  }, 2000);
}

setInterval(() => {
  makePayload();
}, 5000);
delivered();