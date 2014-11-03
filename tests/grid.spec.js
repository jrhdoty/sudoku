var Grid = require('../app/scripts/grid.js');

describe('correctly loaded Grid module', function(){
  it('should correctly load grid module', function(){
    expect(Grid()).to.equal('hello world');
  });
});