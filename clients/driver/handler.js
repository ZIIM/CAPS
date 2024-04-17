function transit(socket, payload) {
  setTimeout(() => {
    console.log('DRIVER', 'picked up', payload);
  }, 2000);

  setTimeout(() => {
    socket.emit('inTransit', payload);
  }, 3000);
}

function delivered(socket, payload) {
  setTimeout(() => {
    console.log('DRIVER', 'delivered', payload);
  }, 2000);
  setTimeout(() => {
    socket.emit('delivered', payload);
  }, 3000);
}

module.exports = { transit, delivered };