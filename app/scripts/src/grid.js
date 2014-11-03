

var Grid = function(dim){
  this.dim  = dim;
  this.grid = createGrid(dim);
};

Grid.prototype.createGrid = function(dim){
  return _.map(Array.apply(null, Array(dim)), function(n){
    return null;
  });
};

module.exports = Grid;

