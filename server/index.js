// const events = require('./eventPool');
// const driverListening = require('./driver');
// const vendor = require('./vendor');
require('dotenv').config();

const io = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = new io.Server(PORT);
const caps = server.of('/caps');

let state = {
  event: 'no events yet',
  time: 'no time yet',
  payload: {
    store: 'store name',
    orderID: 'order number',
    customer: 'customer name',
    address: 'customer address',
  },
};

caps.on('connection', (socket) => {
  console.log('Client has connected');
  socket.on('join', (payload) => {
    socket.join(payload.store);
    caps.emit('join', payload.clientId + ' has joined the delivery app!');
  });
  socket.on('pickup', (payload) => {
    state = {
      event: 'pickup',
      time: new Date(),
      payload: payload,
    };
    caps.to(payload.store).emit('pickup', payload);
    console.log('EVENT:', state);
  });

  socket.on('inTransit', (payload) => {
    state = {
      event: 'inTransit',
      time: new Date(),
      payload: payload,
    };
    caps.to(payload.store).emit('inTransit', payload);
    console.log('EVENT:', state);
  });

  socket.on('delivered', (payload) => {
    state = {
      event: 'delivered',
      time: new Date(),
      payload: payload,
    };
    caps.to(payload.store).emit('delivered', payload);
    console.log('EVENT:', state);
  });
});
