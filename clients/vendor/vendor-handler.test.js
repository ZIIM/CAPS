const newPackage = require('./handler.js');

describe('newPackage Function', () => {
  it('should return a payload object with expected properties', () => {
    const payload = newPackage();
    
    expect(payload).toHaveProperty('store');
    expect(payload).toHaveProperty('orderID');
    expect(payload).toHaveProperty('customer');
    expect(payload).toHaveProperty('address');
  });
});