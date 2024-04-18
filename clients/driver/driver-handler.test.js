const handler = require('./handler.js');

describe('transit Event Handler', () => {
  it('should emit inTransit event with correct payload', (done) => {
    const payload = {};
    const socketMock = {
      emit: jest.fn(),
    };

    handler.transit(socketMock, payload);

    setTimeout(() => {
      expect(socketMock.emit).toHaveBeenCalledWith('inTransit', payload);
      done();
    }, 2100);
  });
  // chatgpt some of this below
  it('should log "DRIVER picked up" with correct payload', (done) => {
    const payload = {}; //RETURN TO THIS PART
    const consoleSpy = jest.spyOn(console, 'log'); // Spy on console.log to check if it's called

    handler.transit({}, payload);

    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith('DRIVER', 'picked up', payload);
      consoleSpy.mockRestore(); // Restore the original console.log function
      done();
    }, 1100);
  });
});