const handler = require('./handler.js');

jest.mock('socket.io-client', () => ({
  connect: jest.fn(() => ({
    emit: jest.fn(),
    on: jest.fn(),
  })),
}));

describe('Driver handler functions', () => {
  test('transit function should emit "inTransit" event', () => {
    const socket = require('socket.io-client').connect();
    const mockPayload = { orderID: expect.any(Number), customer: expect.any(String) };
    handler.transit(socket, mockPayload);
    expect(socket.emit).toHaveBeenCalledWith('inTransit', mockPayload);
  });

  test('delivered function should emit "delivered" event', () => {
    const socket = require('socket.io-client').connect();
    const mockPayload = { orderID: expect.any(Number), customer: expect.any(String) };
    handler.delivered(socket, mockPayload);
    expect(socket.emit).toHaveBeenCalledWith('delivered', mockPayload);
  });
});