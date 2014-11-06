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

  it('should correctly identify row conflicts', function(){
    boxes[4][0].set('value', 9);
    boxes[4][1].set('value', 9);
    var conflicts = grid.get('rowConflicts');
    console.log('conflicts is: ', conflicts);
    expect(conflicts.length).to.equal(1);
    expect(conflicts[0]).to.equal(4);
  });


  it('should correctly identify column conflicts', function(){
    boxes[0][4].set('value', 9);
    boxes[8][4].set('value', 9);
    var conflicts = grid.get('colConflicts');
    console.log('conflicts is: ', conflicts);
    expect(conflicts.length).to.equal(1);
    expect(conflicts[0]).to.equal(4);
  });
});