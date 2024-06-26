require('dotenv').config();
const io = require('socket.io');
const {StandardQueue, FifoQueue} = require('./lib/queue');
const PORT = process.env.PORT || 3000;

const server = new io.Server(PORT);
const caps = server.of('/caps');

const pickupQue  = new StandardQueue('pickupQue');
const recievedQue = new FifoQueue('recievedQue');
const inTransitQue = new StandardQueue('inTransitQue');

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
    caps.emit('join', `${payload.clientId} has joined the delivery app!`);
  });

  socket.on('pickup', (payload) => {
    updateState('pickup', payload);
    caps.to(payload.store).emit('pickup', payload);
    logEvent();
  });

  socket.on('inTransit', (payload) => {
    updateState('inTransit', payload);
    caps.to(payload.store).emit('inTransit', payload);
    logEvent();
  });

  socket.on('delivered', (payload) => {
    updateState('delivered', payload);
    caps.to(payload.store).emit('delivered', payload);
    logEvent();
  });
});

function updateState(event, payload) {
  state = {
    event: event,
    time: new Date(),
    payload: payload,
  };
}

function logEvent() {
  console.log('EVENT:', state);
}