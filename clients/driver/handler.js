function transit(socket, payload) {
  setTimeout(() => {
    console.log('DRIVER', 'picked up', payload);
  }, 1000);

  setTimeout(() => {
    socket.emit('inTransit', payload);
  }, 2000);
}

function delivered(socket, payload) {
  setTimeout(() => {
    console.log('DRIVER', 'delivered', payload);
  }, 1000);
  setTimeout(() => {
    socket.emit('delivered', payload);
  }, 2000);
}

module.exports = { transit, delivered };