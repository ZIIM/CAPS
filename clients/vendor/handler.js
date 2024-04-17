const Chance = require('chance');

const chance = new Chance();

function newPackage(payload){
  return(payload ={
    store: '1-206-flowers',
    orderID: chance.natural(),
    customer: chance.name(),
    address: chance.address(),
  });
}

module.exports = newPackage;