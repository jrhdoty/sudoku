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
    expect(conflicts.length).to.equal(1);
    expect(conflicts[0]).to.equal(4);
  });

  it('should correctly identify quadrant conflicts', function(){
    //quadrant 0
    boxes[0][0].set('value', 1);
    boxes[1][1].set('value', 1);

    //quadrant 1
    boxes[0][3].set('value', 2);
    boxes[1][4].set('value', 2);

    //quadrant 2
    boxes[0][6].set('value', 3);
    boxes[1][7].set('value', 3);

    //quadrant 3
    boxes[3][0].set('value', 4);
    boxes[4][1].set('value', 4);

    //quadrant 4
    boxes[4][4].set('value', 5);
    boxes[5][5].set('value', 5);

    //quadrant 5
    boxes[3][6].set('value', 6);
    boxes[4][7].set('value', 6);

    //quadrant 6
    boxes[6][0].set('value', 7);
    boxes[7][1].set('value', 7);

    //quadrant 7
    boxes[6][3].set('value', 8);
    boxes[7][4].set('value', 8);

    //quadrant 8
    boxes[7][7].set('value', 9);
    boxes[8][8].set('value', 9);

    var conflicts = grid.get('quadrantConflicts');
    expect(conflicts.length).to.equal(9);
    for (var i = 0; i < 9; i++){
    expect(_.contains(conflicts, i)).to.equal(true);
    }
  });


});