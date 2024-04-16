function transit(events, payload) {
  events.emit('inTransit', payload);
  console.log('DRIVER', 'picked up', payload.orderID);
}
  
function delivered(events, payload) {
  events.emit('delivered', payload);
  console.log('DRIVER', 'delivered', payload.orderID);
}
  
module.exports = { transit, delivered };