const newPackage = require('./handler.js');

jest.mock('socket.io-client', () => ({
  connect: jest.fn(() => ({
    emit: jest.fn(),
    on: jest.fn(),
  })),
}));

describe('newPackage function', () => {
  test('should return a new package object', () => {
    const pkg = newPackage();
    expect(pkg).toHaveProperty('store', '1-206-flowers');
    expect(pkg).toHaveProperty('orderID', expect.any(Number));
    expect(pkg).toHaveProperty('customer', expect.any(String));
    expect(pkg).toHaveProperty('address', expect.any(String));
  });
});
// FIX THIS LATER BELOW
// describe('Vendor socket interactions', () => {
//   test('should emit a pickup event with payload', () => {
//     const socket = require('socket.io-client').connect();
//     makePayload();
//     expect(socket.emit).toHaveBeenCalledWith('pickup', expect.any(Object));
//   });

//   test('should log thank you message when delivered event received', () => {
//     const socket = require('socket.io-client').connect();
//     delivered();
//     socket.on.mock.calls[0][1]();
//     expect(console.log).toHaveBeenCalledWith('VENDOR', 'Thank you for the delivery!');
//   });
// });
