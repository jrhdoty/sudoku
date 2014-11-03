var Grid = require('../app/scripts/src/grid.js');

describe('correctly loaded Grid module', function(){
  it('should correctly load grid module', function(){
    expect(typeof Grid).to.equal('function');
  });
});