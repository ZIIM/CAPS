const events = require('../eventPool.js');
const handler = require('./handler.js');

function pickedUP() {
  events.on('pickup', (payload) => handler.transit(events, payload));
}

function droppingOff() {
  events.on('inTransit', (payload) => handler.delivered(events, payload));
}

module.exports = { pickedUP, droppingOff };