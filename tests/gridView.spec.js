var GridView = require('../app/scripts/src/gridView.js'),
    Grid     = require('../app/scripts/src/grid.js');

describe('GridView', function(){
  var gridView, grid, elem;

  beforeEach(function(){
    grid = new Grid();
    gridView = new GridView({model: grid});
    elem = gridView.render();
  });

  it('should correctly render with data from model', function(){
    expect(elem.prop("tagName").toLowerCase()).to.equal('table');
  });

  it('should render the correct number of rows and columns', function(){
    expect(elem.find("tr:first td").length).to.equal(grid.dim);
    expect(elem.find("tr").length).to.equal(grid.dim);
  });

});


