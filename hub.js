const events = require('./eventPool');
const driverListening = require('./driver');
const vendor = require('./vendor');

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

let pickupLogged = false;
let inTransitLogged = false;
let deliveredLogged = false;

events.on('pickup', (payload) => {
  if (!pickupLogged) {
    state = {
      event: 'pickup',
      time: new Date(),
      payload: payload,
    };
    console.log('EVENT:', state);
    pickupLogged = true;
  }
});

events.on('inTransit', (payload) => {
  if (!inTransitLogged) {
    state = {
      event: 'inTransit',
      time: new Date(),
      payload: payload,
    };
    console.log('EVENT:', state);
    inTransitLogged = true;
  }
});

events.on('delivered', (payload) => {
  if (!deliveredLogged) {
    state = {
      event: 'delivered',
      time: new Date(),
      payload: payload,
    };
    console.log('EVENT:', state);
    deliveredLogged = true;
  }
});

//CHAT GPT below, hard time gettting the order right
vendor.createPayload(); // This emits the 'pickup' event
driverListening.pickedUP(); // Simulate the driver picking up the package
vendor.createPayload(); // This emits another 'pickup' event, simulating a new package being picked up
driverListening.droppingOff(); // Simulate the driver dropping off the package
vendor.createPayload();
vendor.delivered(); // This emits the 'delivered' event