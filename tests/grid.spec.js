var Grid = require('../app/scripts/src/grid.js');

describe('Grid Model', function(){
  var grid, dim, boxes, state;

  beforeEach(function(){
    grid = new Grid();
    boxes = grid.get('boxes');
    state = false;
  });

  it('should create an dim*dim matrix of box models on initialization', function(){
    expect(Array.isArray(boxes)).to.equal(true);
    expect(boxes.length).to.equal(9);

    for (var i = 0; i < boxes.length; i++ ){
      expect(boxes[i].length).to.equal(9);
    }
  });

  it('should trigger changed if a contained box model changed', function(){
    grid.on('changed', function(){
      state = !state;
    });

    expect(state).to.equal(false);
    boxes[0][0].set('value', 10);
    expect(state).to.equal(true);
  });
});