'use strict';
var Grid     = require('./grid.js'),
    GridView = require('./gridView.js');

(function(){
  $(document).ready(function(){
    var grid     = new Grid();
    grid.newGame(25);
    var gridView = new GridView({model: grid});

    $('.sudoku').append(gridView.render());
  });
})();