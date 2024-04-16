const Chance = require('chance');

const chance = new Chance();

function newPackage(payload){
  return(payload ={
    store: chance.word({length: 5}),
    orderID: chance.google_analytics(),
    customer: chance.name(),
    address: chance.address(),
  });
}

module.exports = newPackage;